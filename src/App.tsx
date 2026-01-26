import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/components/WalletProvider";
import { GlobalChatWidget } from "@/components/GlobalChatWidget";
import Index from "./pages/Index";
import Token from "./pages/Token";
import Mint from "./pages/Mint";
import Team from "./pages/Team";
import Docs from "./pages/Docs";
import DAO from "./pages/DAO";
import Propose from "./pages/Propose";
import Governance from "./pages/Governance";
import Iran from "./pages/Iran";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Risks from "./pages/Risks";
import Vote from "./pages/Vote";
import Identity from "./pages/Identity";
import NotFound from "./pages/NotFound";

const basename = import.meta.env.BASE_URL || '/';

const App = () => (
  <WalletProvider>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/token" element={<Token />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/mint/:chain" element={<Mint />} />
          <Route path="/team" element={<Team />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/dao" element={<DAO />} />
          <Route path="/propose" element={<Propose />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/identity" element={<Identity />} />
          <Route path="/identity/:network" element={<Identity />} />
          <Route path="/iran" element={<Iran />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/risks" element={<Risks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GlobalChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </WalletProvider>
);

export default App;
