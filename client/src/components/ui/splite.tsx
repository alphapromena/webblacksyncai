'use client';

import { Suspense, lazy, Component, type ReactNode } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/** If the 3D scene fails to load (e.g. offline / blocked CDN), show a soft
 *  fallback instead of crashing the whole page. */
class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-40 h-40 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-orange-500 to-amber-500 shadow-xl ring-1 ring-black/5 flex items-center justify-center">
            <span className="text-white font-display font-bold text-3xl">B</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SceneBoundary fallback={<SceneFallback />}>
      <Suspense fallback={<SceneFallback />}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SceneBoundary>
  );
}
