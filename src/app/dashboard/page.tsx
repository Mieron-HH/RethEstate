"use client";

import { useEffect, useState } from "react";
import "./_page.scss";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/libs/hooks";
import Image from "next/image";

// COMPONENTS
import DashboardDrawer from "@/components/Dashboard-Drawer/dashboard_drawer";
import Toast from "@/components/Toast/toast";

// DRAWER COMPONENTS
import MyProperties from "@/components/Dashboard-Components/My-Properties/my_properties";

// ACTIONS
import { setToast, setUser } from "@/libs/slices/common-slice";

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const route = useRouter();
	const { dashboardComponent } = useAppSelector((state) => state.common);
	const { data: session, status } = useSession();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (status !== "loading" && (!session || !session.user)) {
			dispatch(setToast({ type: "error", message: "User not signed in" }));
			route.replace("/");
		}

		if (session && session.user) {
			dispatch(setUser(session.user));
			setAuthenticated(true);
		}
	}, [status]);

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
