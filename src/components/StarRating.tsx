import { Star } from 'lucide-react';

interface Props {
  rating?: number;
  onChange?: (r: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function StarRating({ rating = 0, onChange, readonly = false, size = 16 }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(n === rating ? 0 : n)}
          className={`transition-transform ${!readonly ? 'hover:scale-125 cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            size={size}
            className={n <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-yellow-400/30'}
          />
        </button>
      ))}
    </div>
  );
}
