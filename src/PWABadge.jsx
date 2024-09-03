import { useRegisterSW } from "virtual:pwa-register/react";

function PWABadge() {
	// periodic sync is disabled, change the value to enable it, the period is in milliseconds
	// You can remove onRegisteredSW callback and registerPeriodicSync function
	const period = 0;

	const {
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			if (period <= 0) return;
			if (r?.active?.state === "activated") {
				registerPeriodicSync(period, swUrl, r);
			} else if (r?.installing) {
				r.installing.addEventListener("statechange", (e) => {
					/** @type {ServiceWorker} */
					const sw = e.target;
					if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
				});
			}
		},
	});

	function close() {
		setNeedRefresh(false);
	}

	return (
		<div className="PWABadge" role="alert" aria-labelledby="toast-message">
			{needRefresh && (
				<div className="PWABadge-toast border fixed p-3 space-y-3 rounded-lg bottom-5 right-5 bg-white shadow-md shadow-emerald-200">
					<div className="PWABadge-message">
						<span id="toast-message text-pretty ">
							New update available, click to update.
						</span>
					</div>
					<div className="PWABadge-buttons space-x-3">
						<button
							className="PWABadge-toast-button border px-3 py-1 rounded-md"
							onClick={() => updateServiceWorker(true)}
						>
							Update
						</button>
						<button
							className="PWABadge-toast-button border px-3 py-1 rounded-md"
							onClick={() => close()}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param period {number}
 * @param swUrl {string}
 * @param r {ServiceWorkerRegistration}
 */
function registerPeriodicSync(period, swUrl, r) {
	if (period <= 0) return;

	setInterval(async () => {
		if ("onLine" in navigator && !navigator.onLine) return;

		const resp = await fetch(swUrl, {
			cache: "no-store",
			headers: {
				cache: "no-store",
				"cache-control": "no-cache",
			},
		});

		if (resp?.status === 200) await r.update();
	}, period);
}
