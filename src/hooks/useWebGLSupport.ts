import { useState } from 'react';

function canCreateWebGLContext(): boolean {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  return Boolean(
    canvas.getContext('webgl2', { powerPreference: 'high-performance' }) ??
      canvas.getContext('webgl', { powerPreference: 'high-performance' }),
  );
}

export function useWebGLSupport(): boolean {
  return useState(canCreateWebGLContext)[0];
}
