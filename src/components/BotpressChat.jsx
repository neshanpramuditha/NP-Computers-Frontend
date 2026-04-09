import { useEffect } from "react";

const BOT_SCRIPTS = [
  {
    id: "botpress-webchat-script",
    src: "https://cdn.botpress.cloud/webchat/v3.6/inject.js",
    async: true,
  },
  {
    id: "botpress-custom-script",
    src: "https://files.bpcontent.cloud/2026/04/09/16/20260409160302-GSNKZZUC.js",
    defer: true,
  },
];

function loadScript({ id, src, async = false, defer = false }) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  if (async) script.async = true;
  if (defer) script.defer = true;
  document.head.appendChild(script);
}

function cleanupBotpress() {
  const win = window;

  if (win.botpressWebChat && typeof win.botpressWebChat.destroy === "function") {
    try {
      win.botpressWebChat.destroy();
    } catch (error) {
      console.warn("Botpress cleanup error:", error);
    }
  }

  BOT_SCRIPTS.forEach(({ id }) => {
    const script = document.getElementById(id);
    if (script) script.remove();
  });

  const widget = document.querySelector("#bp-web-widget, .bp-web-widget");
  if (widget) widget.remove();
}

export default function BotpressChat() {
  useEffect(() => {
    BOT_SCRIPTS.forEach(loadScript);

    return () => {
      cleanupBotpress();
    };
  }, []);

  return null;
}
