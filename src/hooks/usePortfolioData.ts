import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

export type Project = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  year?: string | number | null;
  client?: string | null;
  description?: string | null;
  featured?: boolean | null;
  order_index?: number | null;
  content?: string | null;

  // ✅ corrigido: tipo correto
  images?: string[] | null;

  technologies?: unknown | null;
  project_date?: string | null;
  project_url?: string | null;
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

//
// ✅ helper seguro para converter images
//
function parseImages(images: unknown): string[] | null {
  if (!images) return null;

  // já é array
  if (Array.isArray(images)) {
    return images.filter((img) => typeof img === "string");
  }

  // é string JSON
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        return parsed.filter((img) => typeof img === "string");
      }
    } catch {
      return null;
    }
  }

  return null;
}

//
// ✅ useProjects
//
export function useProjects(category?: string | string[]): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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
        query = query.in("category", category);
      } else if (typeof category === "string" && category !== "all") {
        query = query.eq("category", category);
      }

      const { data, error: supaError } = await query;

      if (cancelled) return;

      if (supaError) {
        console.error("Error fetching projects:", supaError);
        setError(supaError.message);
        setProjects([]);
      } else {
        const parsed = (data || []).map((project) => ({
          ...project,
          images: parseImages(project.images),
        })) as Project[];

        setProjects(parsed);
      }

      setLoading(false);
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, [key]);

  return { projects, loading, error };
}

//
// ✅ useProject
//
export function useProject(projectId?: string): UseProjectResult {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProject() {
      if (!projectId) {
        setProject(null);
        setLoading(false);
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
      } else if (data) {
        setProject({
          ...data,
          images: parseImages(data.images),
        } as Project);
      } else {
        setProject(null);
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