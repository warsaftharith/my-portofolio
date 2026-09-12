import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiOutlineClock } from "react-icons/hi";

const Skripsi = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-slate-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full text-center"
      >
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <HiOutlineClock className="text-5xl text-slate-700 dark:text-white" />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          Coming Soon
        </span>

        {/* Title */}
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Halaman Sedang Dibangun
        </h1>

        {/* Description */}
        <p className="mt-5 text-slate-600 dark:text-slate-400 leading-8">
          Layanan skripsi, proposal, jurnal, PPT seminar, dan revisi dokumen
          akademik sedang dipersiapkan. Halaman ini akan segera tersedia dengan
          informasi lengkap.
        </p>

        {/* Button */}
        <div className="mt-10">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-slate-900
              dark:bg-white
              px-7
              py-3.5
              font-semibold
              text-white
              dark:text-slate-900
              hover:-translate-y-1
              hover:shadow-xl
              transition-all
              duration-300
            "
          >
            <HiArrowLeft className="text-lg" />
            Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Skripsi;