import Image from "next/image";
import styles from "./BrandScene.module.css";

type Props = {
  src: string;
  alt: string;
  placement?: "left" | "right";
};

export function BrandScene({ src, alt, placement = "right" }: Props) {
  return (
    <div className={styles.scene} data-placement={placement}>
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.exposure}>
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" />
      </div>
      <div className={styles.silk} aria-hidden="true" />
    </div>
  );
}
