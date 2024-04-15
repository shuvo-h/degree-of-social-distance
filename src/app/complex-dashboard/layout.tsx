import React from 'react';
// import UserAnalytics from "@/components/UserAnalytics";
// import RevenueMetrics from "@/components/RevenueMetrics";
// import Notifications from "@/components/Notifications";

// parallel layout and routing, insted of manual import, we can use "@componetFolderName"
// @paeallel route @page act as component, so you can't access by routing like "/dashboard/@users"
// must need a default.tsx file to handle reload
type TDashboardProps = {
    children: React.ReactNode,
    notifications: React.ReactNode,     // must match fonder naming "@notifications"
    users: React.ReactNode,             // must match fonder naming "@users"
    revenue: React.ReactNode,           // must match fonder naming "@revenue"
}

const DashboardLayout = ({children,notifications,revenue,users}:TDashboardProps) => {
    return (
        <div>
            {children}
            <div style={{display:"flex"}}>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <div>{users}</div>
                    <div>{revenue}</div>
                </div>
                <div style={{display:"flex",flex:1}}>
                    {notifications}
                </div>
            </div>
            {/* 
                <UserAnalytics />
                <RevenueMetrics />
                <Notifications />
             */}

        </div>
    );
};

export default DashboardLayout;