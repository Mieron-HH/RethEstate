"use client";

import { useEffect, useState } from "react";
import "./_page.scss";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import Image from "next/image";

// COMPONENTS
import DashboardDrawer from "@/components/Dashboard-Drawer/dashboard_drawer";
import Toast from "@/components/Toast/toast";

// DASHBOARD COMPONENTS
import MyProperties from "@/components/Dashboard-Components/My-Properties/my_properties";

// ACTIONS
import { setToast, setUser } from "@/libs/slices/common-slice";

// SERVIECS
import { getCurrentUser } from "@/libs/services/api-calls";

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { dashboardComponent, user } = useAppSelector((state) => state.common);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		(async () => {
			if (!user) {
				const user = await getCurrentUser();
				if (!user) {
					dispatch(setToast({ type: "error", message: "User not signed in" }));
					router.replace("/auth");
				} else {
					dispatch(setUser(user));
					setAuthenticated(true);
				}
			} else setAuthenticated(true);
		})();
	}, []);

	return (
		<div className="dashboard">
			{authenticated ? (
				<>
					<div className="dashboard__drawer">
						<DashboardDrawer />
					</div>

					<div className="dashboard__content">
						{dashboardComponent === "myProperty" && <MyProperties />}
					</div>

					<Toast />
				</>
			) : (
				<div className="page__loading">
					<div className="session__loading">
						<Image src="/loading-gif.gif" quality={100} fill alt="" />
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
