"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function WebViewRedirect() {
  const router = useRouter();

  useEffect(() => {
    const isWebView = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      // Check for common webview patterns
      return (
        /wv|WebView/.test(userAgent) ||
        /FBAN|FBAV/.test(userAgent) || // Facebook
        /Instagram/.test(userAgent) || // Instagram
        /Line/.test(userAgent) || // Line
        /MicroMessenger/.test(userAgent) || // WeChat
        /QQ\//.test(userAgent) || // QQ
        /TikTok/.test(userAgent) || // TikTok
        /Snapchat/.test(userAgent) || // Snapchat
        /Twitter/.test(userAgent) || // Twitter
        /LinkedInApp/.test(userAgent) // LinkedIn
      );
    };

    if (isWebView()) {
      // Try to open in external browser
      const currentUrl = window.location.href;
      
      // For iOS, try to open with Safari
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        window.location.href = `x-web-search://?${encodeURIComponent(currentUrl)}`;
        // Fallback after a delay
        setTimeout(() => {
          window.open(currentUrl, '_blank', 'noopener,noreferrer');
        }, 1000);
      } else {
        // For Android and others, try to open in external browser
        window.open(currentUrl, '_blank', 'noopener,noreferrer');
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
