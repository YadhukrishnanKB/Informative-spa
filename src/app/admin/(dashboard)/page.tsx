import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [pages, widgets, messages, unread] = await Promise.all([
    prisma.page.count(),
    prisma.widget.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Pages", value: pages, color: "bg-blue-500" },
    { label: "Widgets", value: widgets, color: "bg-green-500" },
    { label: "Messages", value: messages, color: "bg-purple-500" },
    { label: "Unread", value: unread, color: "bg-red-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white text-xl font-bold mb-4`}>
              {stat.value}
            </div>
            <h3 className="text-gray-600 font-medium">{stat.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
