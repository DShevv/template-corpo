import styles from "./DownloadFiles.module.scss";
import clsx from "clsx";

interface DownloadFilesProps {
  className?: string;
  files: {
    title: string;
    file_path: string;
  }[];
  storeUrl: string;
}

const DownloadFiles = ({ className, files, storeUrl }: DownloadFilesProps) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className={clsx(styles.container, className)}>
      <ul className={styles.list}>
        {files.map((file, index) => (
          <li key={index} className={styles.item}>
            <a
              href={`${storeUrl}/${file.file_path}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={clsx("body-3", styles.link)}
            >
              {file.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadFiles;
