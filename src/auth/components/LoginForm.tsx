import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../services/useAuth";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface LoginFormProps {
    redirectTo?: string;
}

const LoginForm = ({ redirectTo = "/home" }: LoginFormProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 🔹 toggle password visibility

    const { loginService, loading, error } = useAuth();
    const navigate = useNavigate();

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    const handleLogin = useCallback(async () => {
        setTouched(true);
        if (!isFormValid) return;

        const success = await loginService(email, password);
        if (success) navigate(redirectTo);
    }, [email, password, loginService, navigate, redirectTo, isFormValid]);

    return (
        <div className="min-h-screen grid lg:grid-cols-2 items-center bg-gray-50">

            {/* ================= LEFT - VISUEL BRANDING ================= */}
            <div className="hidden lg:flex flex-col items-center justify-center px-16 py-12 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end text-white text-center">
                <img src="/logo/logo.png" alt="Logo" className="w-40 h-40 mb-8 object-contain" />
                <h1 className="text-5xl font-extrabold leading-tight mb-4">
                    Bienvenue sur <span className="text-brand-gold">REAL.ESTATE</span>
                </h1>
                <p className="text-lg text-white/90 max-w-md">
                    Gestion simple, rapide et moderne de vos annonces immobilières. Publiez, modérez et suivez vos performances.
                </p>
            </div>

            {/* ================= RIGHT - FORMULAIRE ================= */}
            <div className="flex items-center justify-center px-6 py-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 rounded-3xl shadow-xl p-10"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-brand-blackLight">Se connecter</h2>
                        <p className="text-sm text-gray-600 mt-1">Entrez vos identifiants pour continuer</p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-5">
                        {/* EMAIL FIELD */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-goldLight transition"
                            />
                            {touched && !email && (
                                <p className="text-sm text-red-500 mt-1">Email requis</p>
                            )}
                        </div>

                        {/* PASSWORD FIELD */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-goldLight transition pr-14"
                            />
                            {/* Eye Icon */}
                            <button
                                type="button"
                                className="absolute right-3 top-[65%] transform -translate-y-1/2 flex items-center justify-center text-gray-400 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
                            </button>
                            {touched && !password && (
                                <p className="text-sm text-red-500 mt-1">Mot de passe requis</p>
                            )}
                        </div>

                        {/* CTA BUTTON */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full bg-brand-gold hover:bg-brand-goldLight text-brand-black font-semibold py-3 rounded-xl transition disabled:opacity-60"
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>

                        {error && (
                            <p className="text-center text-sm text-red-500">{error}</p>
                        )}
                    </div>

                    {/* FOOTER */}
                    {/* <p className="text-center text-sm text-gray-600 mt-8">
            Pas encore de compte ?{" "}
            <span className="text-brand-gold font-bold cursor-pointer hover:underline">
              S’inscrire
            </span>
          </p> */}
                </motion.div>
            </div>
        </div>
    );
};

export default LoginForm;