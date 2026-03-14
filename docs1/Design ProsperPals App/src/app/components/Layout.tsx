import { Outlet, useLocation, Link } from 'react-router';
import { 
  Sparkles, 
  Wallet, 
  BookOpen, 
  Gamepad2, 
  Target, 
  Users, 
  TrendingUp, 
  PieChart, 
  RefreshCw,
  Building2,
  Calendar,
  Plus,
  Settings as SettingsIcon
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const isOnboarding = location.pathname === '/';

  if (isOnboarding) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-[#0f0f1a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1a1a2e] flex flex-col border-r border-white/10">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FFD700]" />
            <span className="font-bold text-xl">ProsperPals</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Companions Section */}
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 px-2">COMPANIONS</div>
            <NavItem 
              to="/chat-goldie" 
              icon="🪙" 
              label="Goldie" 
              active={location.pathname === '/chat-goldie'}
              glow="gold"
            />
            <NavItem 
              to="/chat-fin" 
              icon="📊" 
              label="Fin" 
              active={location.pathname === '/chat-fin'}
              glow="blue"
            />
          </div>

          {/* Workspaces Section */}
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 px-2">WORKSPACES</div>
            <NavItem 
              to="/budget-central" 
              icon={<Wallet className="w-4 h-4" />} 
              label="Budget Central" 
              active={location.pathname === '/budget-central'}
            />
            <NavItem 
              to="/learning-hub" 
              icon={<BookOpen className="w-4 h-4" />} 
              label="Learning Hub" 
              active={location.pathname === '/learning-hub'}
            />
            <NavItem 
              to="/virtual-portfolio" 
              icon={<Gamepad2 className="w-4 h-4" />} 
              label="Virtual Portfolio" 
              active={location.pathname === '/virtual-portfolio'}
            />
            <NavItem 
              to="/goals" 
              icon={<Target className="w-4 h-4" />} 
              label="Goals & Milestones" 
              active={location.pathname === '/goals'}
            />
            <NavItem 
              to="/family-space" 
              icon={<Users className="w-4 h-4" />} 
              label="Family Space" 
              active={location.pathname === '/family-space'}
            />
          </div>

          {/* Dashboards Section */}
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 px-2">DASHBOARDS</div>
            <NavItem 
              to="#" 
              icon={<TrendingUp className="w-4 h-4" />} 
              label="Net Worth" 
            />
            <NavItem 
              to="#" 
              icon={<PieChart className="w-4 h-4" />} 
              label="Spending Insights" 
            />
            <NavItem 
              to="/subscriptions" 
              icon={<RefreshCw className="w-4 h-4" />} 
              label="Subscriptions" 
              active={location.pathname === '/subscriptions'}
            />
          </div>

          {/* Integrations Section */}
          <div>
            <div className="text-xs font-semibold text-gray-400 mb-2 px-2">INTEGRATIONS</div>
            <NavItem 
              to="#" 
              icon={<Building2 className="w-4 h-4" />} 
              label="Banks" 
              badge="3"
            />
            <NavItem 
              to="#" 
              icon={<Calendar className="w-4 h-4" />} 
              label="Google Calendar" 
            />
            <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Integration</span>
            </button>
          </div>
        </nav>

        {/* Settings at bottom */}
        <div className="p-4 border-t border-white/10">
          <NavItem 
            to="/settings" 
            icon={<SettingsIcon className="w-4 h-4" />} 
            label="Settings" 
            active={location.pathname === '/settings'}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  glow?: 'gold' | 'blue';
}

function NavItem({ to, icon, label, active, badge, glow }: NavItemProps) {
  const glowClass = glow === 'gold' 
    ? 'shadow-[0_0_12px_rgba(255,215,0,0.4)]' 
    : glow === 'blue' 
    ? 'shadow-[0_0_12px_rgba(74,144,217,0.4)]' 
    : '';

  const content = (
    <>
      <span className={`${glowClass} ${typeof icon === 'string' ? 'text-lg' : ''}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 text-xs bg-white/10 rounded">
          {badge}
        </span>
      )}
    </>
  );

  if (to === '#') {
    return (
      <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors">
        {content}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-white/10 text-white'
          : 'text-gray-300 hover:bg-white/5'
      }`}
    >
      {content}
    </Link>
  );
}
