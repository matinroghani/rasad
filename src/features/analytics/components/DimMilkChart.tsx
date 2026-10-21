"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartColumn } from "lucide-react";

import type { DimMilkChartItem } from "../types";
import { formatNumber } from "../utils";
import AnalyticsPanel from "./AnalyticsPanel";

interface DimMilkChartProps {
  data: DimMilkChartItem[];
}

export default function DimMilkChart({
  data,
}: DimMilkChartProps) {
  const hasData = data.some(
    (item) => item.cows > 0 || item.averageMilk !== null,
  );

  return (
    <AnalyticsPanel
      title="مقایسه تعداد دام و میانگین شیر بر اساس DIM"
      description="DIM تعداد روزهای شیردهی است. فقط اطلاعات ثبت‌شده در هر بازه نمایش داده می‌شود."
    >
      {hasData ? (
        <div className="h-[300px] w-full min-w-0 sm:h-[340px]" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                stroke="var(--panel-border)"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="dim"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                yAxisId="count"
                allowDecimals={false}
                orientation="left"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                width={35}
              />

              <YAxis
                yAxisId="milk"
                orientation="right"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                width={35}
              />

              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--panel-border)",
                  borderRadius: 12,
                  color: "var(--text-main)",
                  fontSize: 12,
                }}
                formatter={(value, name) => [
                  value == null ? "—" : formatNumber(Number(value)),
                  name === "cows" ? "تعداد دام" : "میانگین شیر",
                ]}
                labelFormatter={(label) => `DIM: ${label}`}
              />

              <Bar
                yAxisId="count"
                dataKey="cows"
                name="cows"
                fill="var(--accent-green-light)"
                radius={[5, 5, 0, 0]}
                maxBarSize={44}
              />

              <Line
                yAxisId="milk"
                dataKey="averageMilk"
                name="averageMilk"
                stroke="var(--accent-green)"
                strokeWidth={2.5}
                connectNulls={false}
                dot={{ r: 4, fill: "var(--accent-green)" }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl bg-[var(--surface-warm)] px-4 text-center">
          <ChartColumn
            size={30}
            className="text-[var(--text-muted)]"
          />

          <p className="text-sm font-semibold text-[var(--text-main)]">
            داده کافی برای نمودار وجود ندارد
          </p>

          <p className="text-xs leading-6 text-[var(--text-muted)]">
            برای نمایش این نمودار، اطلاعات DIM و تولید شیر باید ثبت شده باشند.
          </p>
        </div>
      )}
    </AnalyticsPanel>
  );
}