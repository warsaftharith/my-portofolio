import { motion } from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi";

type PriceItem = {
  name: string;
  price: string;
  oldPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
};

type PriceCardProps = {
  item: PriceItem;
  index: number;
  buttonText: string;
  popularText: string;
  normalPriceText: string;
};

const PriceCard = ({
  item,
  index,
  buttonText,
  popularText,
  normalPriceText,
}: PriceCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{
        y: -5,
      }}
      className={`
        relative
        flex
        flex-col
        rounded-3xl
        border
        p-7
        transition-shadow
        duration-300

        ${
          item.popular
            ? `
              border-emerald-500
              bg-slate-900
              dark:bg-slate-900
              text-white
              shadow-xl
              shadow-emerald-500/10
            `
            : `
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              text-slate-900
              dark:text-white
              hover:shadow-xl
            `
        }
      `}
    >
      {/* POPULAR */}
      {item.popular && (
        <div
          className="
            absolute
            -top-3
            left-6
            px-4
            py-1.5
            rounded-full
            bg-emerald-500
            text-white
            text-xs
            font-semibold
          "
        >
          {popularText}
        </div>
      )}

      {/* NAME */}
      <h3 className="text-xl font-semibold">
        {item.name}
      </h3>

      {/* DESCRIPTION */}
      <p
        className={`
          mt-3
          text-sm
          leading-relaxed
          ${
            item.popular
              ? "text-slate-300"
              : "text-slate-500 dark:text-slate-400"
          }
        `}
      >
        {item.description}
      </p>

      {/* PRICE */}
      <div className="mt-7">
        {item.oldPrice && (
          <div
            className={`
              text-sm
              mb-1
              ${
                item.popular
                  ? "text-slate-400"
                  : "text-slate-400 dark:text-slate-500"
              }
            `}
          >
            <span>{normalPriceText}: </span>

            <span className="line-through">
              {item.oldPrice}
            </span>
          </div>
        )}

        <span className="text-4xl font-bold tracking-tight">
          {item.price}
        </span>
      </div>

      {/* DIVIDER */}
      <div
        className={`
          border-t
          my-7
          ${
            item.popular
              ? "border-slate-700"
              : "border-slate-200 dark:border-slate-800"
          }
        `}
      />

      {/* FEATURES */}
      <ul className="space-y-4 flex-1">
        {item.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3"
          >
            <span
              className="
                mt-0.5
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-emerald-500/10
                text-emerald-500
              "
            >
              <HiCheck className="text-sm" />
            </span>

            <span
              className={`
                text-sm
                ${
                  item.popular
                    ? "text-slate-300"
                    : "text-slate-600 dark:text-slate-300"
                }
              `}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* BUTTON */}
      <motion.a
        href={`https://wa.me/6287744586239?text=${encodeURIComponent(
          item.whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          group
          mt-8
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-full
          px-6
          py-3.5
          font-medium
          text-sm
          transition-all
          duration-300

          ${
            item.popular
              ? `
                bg-white
                text-slate-900
                hover:bg-slate-100
              `
              : `
                bg-slate-900
                dark:bg-white
                text-white
                dark:text-slate-900
                hover:bg-slate-800
                dark:hover:bg-slate-100
              `
          }
        `}
      >
        {buttonText}

        <HiArrowRight
          className="
            text-emerald-500
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </motion.a>
    </motion.div>
  );
};

export default PriceCard;