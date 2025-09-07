import React, { useEffect, useState, useRef } from "react";
import styles from "./Hasher.module.css";

function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

export default function Hasher() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef(null);

  useEffect(
    function () {
      if (!text) {
        setHash("");
        return;
      }

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async function () {
        try {
          const encoder = new TextEncoder();
          const data = encoder.encode(text);
          const digest = await crypto.subtle.digest(algo, data);
          setHash(bufferToHex(digest));
        } catch (e) {
          setHash("Ошибка: " + String(e));
        }
      }, 200);
    },
    [text, algo]
  );

  async function copyHash() {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(function () {
        setCopied(false);
      }, 1200);
    } catch {
      setCopied(false);
    }
  }

  // ограниченный вывод (например, 32 символа)
  const displayHash = hash ? hash.slice(0, 32) + (hash.length > 32 ? "…" : "") : "";

  return (
    <>
      <h1>Hasher</h1>
        <main className={styles.Content}>
          <div className={styles.HasherRow}>
            <textarea
              className={styles.HasherInput}
              placeholder="Введите текст"
              value={text}
              rows={3}
              onChange={function (e) {
                setText(e.target.value);
              }}
            />

            <select
              className={styles.HasherSelect}
              value={algo}
              onChange={function (e) {
                setAlgo(e.target.value);
              }}
            >
              <option value="SHA-1">SHA-1</option>
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-512">SHA-512</option>
            </select>
          </div>

          <div className={styles.HasherOutputRow}>
            <pre className={styles.HasherOutput}>
              {displayHash || "Здесь появится хеш"}
            </pre>
            <button
              className={styles.HasherCopy}
              onClick={copyHash}
              disabled={!hash}
            >
              {copied ? "✓ Скопировано" : "Копировать"}
            </button>
          </div>
        </main>
    </>
  );
}
