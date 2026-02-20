// src/hooks/useAuth.ts
import { useEffect, useState, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../api/supabase";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Login avec Supabase
    const loginService = useCallback(
        async (email: string, password: string): Promise<boolean> => {
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    setError(error.message);
                    setLoading(false);
                    return false;
                }

                setUser(data.user ?? null); // sécurité si user est null
                setLoading(false);
                return true;
            } catch (err: unknown) {
                // Vérification que err est bien une erreur JS standard
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Une erreur inattendue est survenue");
                }
                setLoading(false);
                return false;
            }
        },
        []
    );

    // Observer la session actuelle
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        };
        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    return { user, loginService, loading, error };
};