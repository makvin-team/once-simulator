import { motion } from 'framer-motion';
import { Card, Chip } from './ui/index.js';

export function ChoiceOptions({ choices, disabled, onPick }) {
  if (!choices?.length) return null;
  return (
    <div className="grid gap-2">
      {choices.map((choice, index) => (
        <motion.button
          key={choice.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(choice)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index }}
          whileHover={disabled ? {} : { y: -2, rotate: -0.3 }}
          whileTap={disabled ? {} : { y: 2, scale: 0.99 }}
          className={`group block w-full text-left ${
            disabled ? 'cursor-not-allowed opacity-55' : 'cursor-pointer'
          }`}
          aria-disabled={disabled}
        >
          <Card
            tone="paper"
            stroke="thin"
            radius="md"
            pad="sm"
            shadow={disabled ? 'flat' : 'tiny'}
            className={`flex items-start gap-3 transition-colors ${
              disabled ? '' : 'hover:bg-butter'
            }`}
          >
            <Chip
              tone="butter"
              size="md"
              className="!h-7 !w-7 !px-0 justify-center group-hover:bg-peach"
            >
              {String.fromCharCode(65 + index)}
            </Chip>
            <span className="flex-1 text-sm font-bold leading-snug text-ink">
              {choice.text}
            </span>
            <span className="flex-none self-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#2B1E16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Card>
        </motion.button>
      ))}
    </div>
  );
}
