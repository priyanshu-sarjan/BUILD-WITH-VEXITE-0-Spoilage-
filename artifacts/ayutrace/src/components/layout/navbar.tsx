import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import {
  Moon,
  Sun,
  Sprout,
  Eye,
  Mic,
  TrendingDown,
  QrCode,
  Stethoscope,
  Key,
  Search,
  LayoutDashboard,
  LogOut,
  Sparkles,
  CloudSun,
  CheckCircle,
} from "lucide-react";
import { getGeminiApiKey, setGeminiApiKey } from "@/lib/gemini-api";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const [location, setLocation] = useLocation();

  const [isKeyDialogOpen, setIsKeyDialogOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const activeKey = getGeminiApiKey();
    setApiKeyInput(activeKey);
    setHasCustomKey(Boolean(activeKey));
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKeyInput);
    setHasCustomKey(Boolean(apiKeyInput.trim()));
    setIsKeyDialogOpen(false);
  };

  const navLinks = [
    { href: "/products", label: "Smart Marketplace", icon: Sprout },
    { href: "/vision-grading", label: "Produce Vision", icon: Eye },
    { href: "/voice-inventory", label: "Farmer Voice", icon: Mic },
    { href: "/dynamic-pricing", label: "Dynamic Rates", icon: TrendingDown },
    { href: "/traceability", label: "Traceability", icon: QrCode },
    { href: "/crop-health", label: "Crop Health", icon: Stethoscope },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-background/90 backdrop-blur-xl shadow-lg">
      {/* Top Telemetry Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-500/10 py-1 px-4 hidden md:flex items-center justify-between text-[11px] text-emerald-300 font-mono">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400">
            <CloudSun className="w-3.5 h-3.5" /> Nashik Agro-Weather: 26°C Sunny • Humidity 68%
          </span>
          <span className="text-emerald-400/80">|</span>
          <span className="text-emerald-200">
            🌾 Today's Mandi Surplus: Red Tomatoes +45% (Flash Clearance Active)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            FarmersWorld Smart Grid Active
          </span>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between mx-auto px-4 gap-4">
        {/* FarmersWorld Branding */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-2.5 rounded-2xl group-hover:scale-105 transition-all shadow-lg shadow-emerald-900/40">
            <Sprout className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-foreground leading-none flex items-center gap-1.5 font-sans">
              FarmersWorld <span className="text-emerald-400 font-bold text-xs bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">AgriFresh</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono mt-0.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" /> PS Open Innovation • Gemini API
            </span>
          </div>
        </Link>

        {/* Smart Agriculture Search Bar */}
        <div className="hidden xl:flex flex-1 max-w-sm relative">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crops, mandi rates, farmers..."
            className="pl-9 bg-emerald-950/40 border-emerald-500/30 text-xs text-foreground focus-visible:ring-emerald-500 h-9 rounded-xl"
          />
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                    : "text-muted-foreground hover:text-emerald-300 hover:bg-emerald-500/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Gemini Key Badge */}
          <button
            onClick={() => setIsKeyDialogOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/40 transition-all shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{hasCustomKey ? "Gemini Key Active" : "Set Gemini API Key"}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground h-9 w-9"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setLocation("/dashboard")} className="gap-1.5 text-xs h-8 rounded-xl border-emerald-500/30">
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </Button>
              <Button variant="ghost" size="icon" onClick={() => { logout(); setLocation("/"); }} className="text-muted-foreground hover:text-destructive h-8 w-8">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setLocation("/login")} className="text-xs h-8">
                Sign In
              </Button>
              <Button size="sm" onClick={() => setLocation("/register")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 rounded-xl font-bold shadow-md shadow-emerald-900/30">
                Join FarmersWorld
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Sub-bar for mobile navigation */}
      <div className="lg:hidden flex items-center justify-around bg-emerald-950/90 border-t border-emerald-500/20 py-2 px-2 overflow-x-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0 ${
                isActive ? "bg-emerald-600 text-white font-bold" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-3 h-3" />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Gemini Key Configurator Modal */}
      <Dialog open={isKeyDialogOpen} onOpenChange={setIsKeyDialogOpen}>
        <DialogContent className="sm:max-w-[450px] bg-card/95 backdrop-blur-xl border-emerald-500/40">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Key className="w-5 h-5 text-amber-400" /> Configure Gemini API Key 🤖⚡
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Provide your Gemini API key (Google AI Studio). If empty, FarmersWorld automatically provides rich simulated Gemini AI responses for seamless live testing!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveKey} className="space-y-4 pt-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">Gemini API Key</label>
              <Input
                type="password"
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="bg-background/80 text-xs font-mono"
              />
            </div>

            <div className="bg-emerald-950/50 border border-emerald-500/30 p-3 rounded-xl text-[11px] text-emerald-300 space-y-1">
              <p className="font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> High-Fidelity Fallback Mode Active
              </p>
              <p className="text-muted-foreground text-[10px]">
                No API key? You can still test vision grading, vernacular voice extraction, dynamic pricing, and pathology diagnostic tools in real-time.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsKeyDialogOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                Save & Activate Gemini
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
