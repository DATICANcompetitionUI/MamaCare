"use client";

import { useState } from "react";
import { MOCK_PROVIDER_DATA_EMPTY, MOCK_PROVIDER_DATA_FILLED } from "@/lib/provider-data";
import ProviderDashboardEmpty from "@/components/provider/ProviderDashboardEmpty";
import ProviderDashboardFilled from "@/components/provider/ProviderDashboardFilled";
import { Code2 } from "lucide-react";

/**
 * app/(provider)/provider/page.tsx
 *
 * The main Provider Dashboard page.
 */

export default function ProviderDashboardPage() {
  const [isEmptyState, setIsEmptyState] = useState(false);

  const data = isEmptyState ? MOCK_PROVIDER_DATA_EMPTY : MOCK_PROVIDER_DATA_FILLED;

  return (
    <div className="pb-24">
      {/* Dev Toggle Button - Only for demonstration purposes */}
      <div className="bg-gray-800 text-white p-3 rounded-lg flex items-center justify-between mb-8 shadow-md relative z-20">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">Dev Toggle:</span>
        </div>
        <button
          onClick={() => setIsEmptyState(!isEmptyState)}
          className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-md text-sm font-medium transition-colors border border-white/20"
        >
          Switch to {isEmptyState ? "Filled State" : "Empty State"}
        </button>
      </div>

      {isEmptyState ? (
        <ProviderDashboardEmpty data={data} />
      ) : (
        <ProviderDashboardFilled data={data} />
      )}
    </div>
  );
}
