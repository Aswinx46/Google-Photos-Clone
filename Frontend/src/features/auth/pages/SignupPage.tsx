import { motion } from 'framer-motion';
import SignupForm from '../component/SignupForm';

const Signup = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        variants={backgroundVariants}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10"
      />
      
      {/* Floating shapes for visual interest */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-32 right-16 w-16 h-16 bg-secondary/20 rounded-full blur-xl"
      />

      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 right-10 w-12 h-12 bg-accent/15 rounded-full blur-xl"
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sign Up
          </h1>
          <p className="text-lg text-muted-foreground">
            Join our community today
          </p>
        </motion.div>

        <SignupForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="underline hover:text-foreground transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="underline hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;