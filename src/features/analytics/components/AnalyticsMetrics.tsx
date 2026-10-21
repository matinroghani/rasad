import { PawPrint, Milk, TrendingUp, ChartColumn } from "lucide-react";
import AnalyticsMetricCard from "./AnalyticsMetricCard";

interface AnalyticsMetricsProps {
  totalCows: string;
  averageMilk: string;
  maxMilk: string;
  milkRecords: string;
  milkDescription: string;
}

export default function AnalyticsMetrics({
  totalCows,
  averageMilk,
  maxMilk,
  milkRecords,
  milkDescription,
}: AnalyticsMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <AnalyticsMetricCard
        title="کل دام ثبت‌شده"
        value={totalCows}
        description="تعداد پروفایل‌های موجود"
        icon={PawPrint}
      />

      <AnalyticsMetricCard
        title="میانگین شیر روزانه"
        value={averageMilk}
        description={milkDescription}
        icon={Milk}
      />

      <AnalyticsMetricCard
        title="بیشینه شیر روزانه"
        value={maxMilk}
        description="بیشترین مقدار ثبت‌شده برای یک دام"
        icon={TrendingUp}
      />

      <AnalyticsMetricCard
        title="رکوردهای تولید شیر"
        value={milkRecords}
        description="دام‌های دارای مقدار شیر معتبر"
        icon={ChartColumn}
      />
    </div>
  );
}