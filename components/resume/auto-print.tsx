'use client';

import { useEffect } from 'react';

/** Opens the save-as-PDF dialog when the page is reached through a "Download CV" link. */
export function AutoPrint() {
  useEffect(() => {
    const wantsDownload = new URLSearchParams(window.location.search).has('download');
    if (!wantsDownload) return;

    const timer = window.setTimeout(() => window.print(), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
