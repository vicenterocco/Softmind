import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../shared/Button';

interface CTAButtonProps {
  label: string;
  href: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function CTAButton({
  label,
  href,
  icon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}: CTAButtonProps) {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button variant={variant} size={size} fullWidth={fullWidth}>
          <div className="flex items-center justify-center gap-2">
            {icon && <span>{icon}</span>}
            {label}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </Button>
      </motion.div>
    </Link>
  );
}