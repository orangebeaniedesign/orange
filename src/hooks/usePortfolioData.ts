import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

export type Project = {
  id: string;
  title: string;
  category: string;
  year?: string | number | null;
  role?: string | null;
  description?: string | null;
  cover_image_url?: string | null;
  slug?: string | null;
  order_index?: number | null;
  // add any other columns your table has
};

type UseProjectsResult = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

type UseProjectResult = {
  project: Project | null;
  loading: boolean;
  error: string | null;
};

/**
 * ✅ Supports:
 * - undefined => all
 * - "all" => all
 * - "branding" => eq category
 * - ["branding","web"] => in category
 * - special "photography" example => in ['photography']
 */
export function useProjects(category?: string | string[]): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const key = useMemo(() => {
    if (Array.isArray(category)) return `arr:${category.sort().join(",")}`;
    return `str:${category ?? "all"}`;
  }, [category]);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      setLoading(true);
      setError(null);

      if (!supabase) {
        setError("Database not configured");
        setLoading(false);
        return;
      }

      let query = supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (Array.isArray(category) && category.length > 0) {
        query = query.in("category", category as any);
      } else if (typeof category === "string" && category !== "all") {
        if (category === "photography") {
          query = query.in("category", ["photography"] as any);
        } else {
          query = query.eq("category", category as any);
        }
      }

      const { data, error: supaError } = await query;

      if (cancelled) return;

      if (supaError) {
        console.error("Error fetching projects:", supaError);
        setError(supaError.message);
        setProjects([]);
      } else {
        setProjects((data as Project[]) || []);
      }

      setLoading(false);
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { projects, loading, error };
}

export function useProject(projectId?: string): UseProjectResult {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProject() {
      if (!projectId) {
        setProject(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      if (!supabase) {
        setError("Database not configured");
        setLoading(false);
        return;
      }

      const { data, error: supaError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .maybeSingle();

      if (cancelled) return;

      if (supaError) {
        console.error("Error fetching project:", supaError);
        setError(supaError.message);
        setProject(null);
      } else {
        setProject((data as Project) || null);
      }

      setLoading(false);
    }

    fetchProject();

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { project, loading, error };
}
