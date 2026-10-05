import styles from "./CaptoLogo.module.css";

// Same lockup as Capto Sign and Capto Extract (icon + "Capto" wordmark with the product name tucked
// below-right) — one brand family, this product's own name in the subword slot.
export function CaptoLogo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className={`${styles.logo} ${size === "lg" ? styles.logoLg : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/capto-icon.svg" alt="" className={styles.icon} />
      <span className={styles.wordmark}>
        Capto
        <span className={styles.subWord}>Learn</span>
      </span>
    </span>
  );
}
