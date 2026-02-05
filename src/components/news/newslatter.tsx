/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "sonner";
import { XCircle } from "lucide-react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Erro", {
                description: "Email inválido",
                icon: <XCircle />
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://formsubmit.co/ajax/info@mundosaudavel.ao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Feliz em tê-lo connosco!", {
                    description: `Email ${email} subscrito com sucesso!`,
                    className: "text-white bg-green-600",
                });
                setEmail("");
            } else {
                throw new Error("Erro ao enviar.");
            }
        } catch (err) {
            toast.error("Erro", {
                description: "Ocorreu um problema ao enviar o email. Tente novamente.",
                className: "bg-red-500 text-white"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="relative mb-16 p-8 rounded-2xl bg-gradient-to-r from-[#1F8A70] to-green-600 shadow-lg">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-12 -mr-12 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700/20 rounded-full -mb-12 -ml-12 blur-2xl" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Mantenha-se Atualizado
                        </h3>
                        <p className="text-white/90 max-w-md">
                            Subscreva a nossa newsletter para receber as últimas notícias,
                            atualizações e ofertas especiais diretamente na sua caixa de
                            entrada.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Seu endereço de email"
                            className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <motion.button
                            type="submit"
                            className="bg-white text-green-600 font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="animate-pulse">A enviar...</span>
                            ) : (
                                <>
                                    <span>Subscrever</span>
                                    <FiArrowRight />
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </div>
        </div>
    );
}