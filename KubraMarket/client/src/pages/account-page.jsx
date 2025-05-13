// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { format } from "date-fns";
// import { useAuth } from "@/hooks/use-auth";
// import Header from "@/components/shop/Header";
// import Footer from "@/components/shop/Footer";


// export default function AccountPage() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("orders");

//   const { data: orders = [] } = useQuery({
//     queryKey: ["/api/orders"],
//     enabled: activeTab === "orders",
//   });

//   return (
//     <>
//       <Header />
//       <main className="container mx-auto py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8">My Account</h1>

//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center space-x-4 mb-6">
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{user?.name}</h2>
//                 <p className="text-gray-600">{user?.email}</p>
//               </div>
//             </div>

//             <div className="border-b mb-6">
//               <nav className="flex space-x-8">
//                 <button
//                   className={`pb-4 font-medium ${
//                     activeTab === "orders"
//                       ? "border-b-2 border-primary text-primary"
//                       : "text-gray-500"
//                   }`}
//                   onClick={() => setActiveTab("orders")}
//                 >
//                   Orders
//                 </button>
//               </nav>
//             </div>

//             {activeTab === "orders" && (
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="border rounded-lg p-4 hover:border-primary transition-colors"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <p className="font-medium">Order #{order.id}</p>
//                         <p className="text-sm text-gray-500">
//                           {format(new Date(order.createdAt), "PPP")}
//                         </p>
//                       </div>
//                       <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         {order.status}
//                       </span>
//                     </div>

//                     <div className="space-y-2">
//                       {order.items.map((item) => (
//                         <div key={item.id} className="flex justify-between">
//                           <span className="text-gray-600">
//                             {item.quantity}x {item.name}
//                           </span>
//                           <span className="font-medium">
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-4 pt-4 border-t flex justify-between">
//                       <span className="font-medium">Total</span>
//                       <span className="font-bold">
//                         ${order.total_Price.toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import { Loader2 } from "lucide-react";

// export default function AccountPage() {
//   const { user } = useAuth();
//   console.log("User:", user);


//   const { data: orders = [], isLoading, error } = useQuery({
//     queryKey: ["orders", user?.id],
//     queryFn: async () => {
//       const response = await fetch("/api/user/orders");
//       if (!response.ok) throw new Error("Failed to fetch orders");
//       return response.json();
//     },
//     enabled: !!user,
//     staleTime: 30000,
//     retry: 2
//   });

//   if (!user) {
//     return (
//       <>
//         <Header />
//         <main className="container mx-auto py-8 px-4">
//           <div className="text-center">Please log in to view your account.</div>
//         </main>
//         <Footer />
//       </>
//     );
//   }


//   return (
//     <>
//       <Header />
//       <main className="container mx-auto py-8 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8">My Account</h1>

//           {/* User Profile */}
//           <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//             <div className="flex items-center space-x-4">
//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{user.username}</h2>
//                 <p className="text-gray-500">
//                   {user.createdAt 
//                     ? `Member since ${format(new Date(user.createdAt), "MMMM yyyy")}`
//                     : "Member"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Orders */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold mb-6">Order History</h2>
//             <div className="space-y-6">
//               {isLoading ? (
//                 <div className="flex justify-center py-12">
//                   <Loader2 className="h-8 w-8 animate-spin text-primary" />
//                 </div>
//               ) : orders.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No orders found.</p>
//               ) : (
//                 orders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="border rounded-lg p-4 hover:border-primary transition-colors"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <p className="font-medium">Order #{order.id}</p>
//                         <p className="text-sm text-gray-500">
//                           {format(new Date(order.createdAt), "PPP")}
//                         </p>
//                       </div>
//                       <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                         {order.status}
//                       </span>
//                     </div>

//                     <div className="space-y-2">
//                       {order.items.map((item) => (
//                         <div key={item.id} className="flex justify-between">
//                           <span className="text-gray-600">
//                             {item.quantity}x {item.name}
//                           </span>
//                           <span className="font-medium">
//                             ${(item.price * item.quantity).toFixed(2)}
//                           </span>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-4 pt-4 border-t flex justify-between">
//                       <span className="font-medium">Total</span>
//                       <span className="font-bold">
//                         ${order.total_Price}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

export default function AccountPage() {
  const { user, isLoading, isError } = useAuth();
  console.log("User:", user);

  const { data: orders = [], isLoading: ordersLoading, error } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const response = await fetch("/api/user/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json();
    },
    enabled: !!user, // Only fetch orders if user is available
    staleTime: 30000,
    retry: 2
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Loading user data...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="text-center">
        <p>Error loading user data. Please try again later.</p>
        <p>Please log in to view your account.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          {/* User Profile */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-500">
                  {user.createdAt 
                    ? `Member since ${format(new Date(user.createdAt), "MMMM yyyy")}`
                    : "Member"}
                </p>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Order History</h2>
            <div className="space-y-6">
              {ordersLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : orders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders found.</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(order.createdAt), "PPP")}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">
                        ${order.total_Price}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
