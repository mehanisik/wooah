import {
  createIcons,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Timer,
  CircleCheck,
  ChevronDown,
  Zap,
  Trophy,
  Check,
  ArrowUp,
  Minus,
  Dumbbell,
  RefreshCw,
  HeartPulse,
  Plus,
  Camera,
} from 'lucide';

const iconSet = {
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Timer,
  CircleCheck,
  ChevronDown,
  Zap,
  Trophy,
  Check,
  ArrowUp,
  Minus,
  Dumbbell,
  RefreshCw,
  HeartPulse,
  Plus,
  Camera,
};

export function refreshIcons() {
  createIcons({ icons: iconSet, nameAttr: 'data-lucide' });
}
