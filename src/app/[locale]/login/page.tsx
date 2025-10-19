"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import type { Route } from "next";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletLogin } from "@/hooks/use-auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import { getIllustration } from "@/lib/illustrations";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/settings";

export const dynamic = "force-dynamic";

type LoginState = "idle" | "signing" | "success" | "error";

function LoginContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useMemo<Locale>(() => {
    const segments = pathname.split("/").filter(Boolean);
    const maybeLocale = segments[0];
    if (maybeLocale && locales.includes(maybeLocale as Locale)) {
      return maybeLocale as Locale;
    }
    return defaultLocale;
  }, [pathname]);

  const rawRedirect = searchParams?.get("redirect");

  const redirect = useMemo<Route>(() => {
    const candidate = rawRedirect;
    if (candidate && candidate.startsWith("/") && !candidate.startsWith("//")) {
      if (candidate === "/") {
        return (`/${currentLocale}`) as Route;
      }
      const candidateSegments = candidate.split("/").filter(Boolean);
      const candidateLocale = candidateSegments[0];
      if (candidateLocale && locales.includes(candidateLocale as Locale)) {
        return candidate as Route;
      }
      return (`/${currentLocale}${candidate}`) as Route;
    }
    return (`/${currentLocale}`) as Route;
  }, [currentLocale, rawRedirect]);
  const loginIllustration =
    getIllustration("loginBackdrop", "light") ?? "/illustrations/login-backdrop.light.svg";

  const [state, setState] = useState<LoginState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { address, chainId, isConnected } = useAccount();
  const walletLogin = useWalletLogin();

  const handleLogin = useCallback(async () => {
    if (!address || !chainId) return;

    try {
      setState("signing");
      setErrorMessage("");

      await walletLogin.mutateAsync({ address, chainId });

      setState("success");

      setTimeout(() => {
        router.push(redirect);
      }, 1000);

    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Login failed");
    }
  }, [address, chainId, walletLogin, router, redirect]);

  useEffect(() => {
    if (isConnected && address && chainId && state === "idle") {
      void handleLogin();
    }
  }, [isConnected, address, chainId, state, handleLogin]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface">
      <div className="absolute inset-0 -z-20 bg-hero-gradient from-brand-gradient-start via-brand-gradient-mid to-brand-gradient-end" />
      <div className="absolute inset-0 -z-10 bg-grid-overlay bg-[length:140px_140px] opacity-20" />

      <GradientCard className="w-full max-w-md space-y-6 p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src={loginIllustration}
            alt=""
            width={80}
            height={80}
            className="size-20 animate-float-slow"
            priority
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-surface-contrast/80">Welcome Back</h1>
            <p className="text-sm text-surface-contrast/80">
              Connect your wallet to continue to Agent Benchmark
            </p>
          </div>
        </div>

        {state === "idle" && !isConnected && (
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        )}

        {state === "signing" && (
          <div className="flex flex-col items-center gap-3 py-6">
            <Loader2 className="size-8 animate-spin text-brand-highlight" />
            <p className="text-sm text-surface-contrast/80">Signing in with your wallet...</p>
          </div>
        )}

        {state === "success" && (
          <div className="flex flex-col items-center gap-3 py-6 text-emerald-300">
            <CheckCircle className="size-8" />
            <p className="text-sm font-medium">Login successful! Redirecting...</p>
          </div>
        )}

        {state === "error" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-rose-500/10 p-4 text-rose-200">
              <AlertCircle className="size-5 shrink-0" />
              <p className="text-sm">{errorMessage}</p>
            </div>
            <Button onClick={handleLogin} variant="secondary" size="lg" className="w-full">
              Retry
            </Button>
          </div>
        )}

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-surface-contrast/60">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </GradientCard>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <Loader2 className="size-8 animate-spin text-brand-highlight" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}



