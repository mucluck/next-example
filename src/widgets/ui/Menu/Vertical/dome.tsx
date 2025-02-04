const Dome = ({ size = 32, stroke = 2 }: any) => {
	return (
		<svg
			width={size}
			height={size}
			strokeWidth={stroke}
			fill="currentColor"
			viewBox="0 0 20 26"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="m17 23h-14v2h14v-2zm-15-1v3c0 0.5523 0.44772 1 1 1h14c0.5523 0 1-0.4477 1-1v-3h-16z"
				clipRule="evenodd"
				fillRule="evenodd"
			/>
			<path
				d="m18.45 19.324c0 0.9743-0.2248 1.7024-0.5842 2.2622-0.0929 0.1447-0.1975 0.2825-0.3142 0.4135h0.4484v0.9699c0.9186-0.8548 1.45-2.0363 1.45-3.6456 0-3.1609-2.0354-4.6249-4.217-6.194-1.8452-1.3271-3.7949-2.7294-4.706-5.2973-0.3328-0.93782-0.52699-2.0311-0.52699-3.333 0 1.3019-0.19422 2.3951-0.52696 3.333-0.91111 2.5679-2.8608 3.9702-4.706 5.2973-2.1816 1.5691-4.217 3.0331-4.217 6.194 0 1.6093 0.53146 2.7908 1.45 3.6456l-1e-5 -0.9699h0.4484c-0.11664-0.131-0.22132-0.2688-0.31424-0.4135-0.35933-0.5598-0.58416-1.2879-0.58416-2.2622 0-2.6325 1.6122-3.7982 3.8659-5.4279 0.14656-0.106 0.29585-0.2139 0.44757-0.3244 1.191-0.8669 2.4936-1.8811 3.4829-3.3143 0.23958-0.34704 0.45873-0.71541 0.65361-1.1084 0.19489 0.39302 0.41399 0.76139 0.65359 1.1084 0.9893 1.4332 2.2919 2.4474 3.4829 3.3143 0.1517 0.1104 0.3009 0.2183 0.4475 0.3243 2.2537 1.6297 3.866 2.7955 3.866 5.428z"
				clipRule="evenodd"
				fillRule="evenodd"
			/>
			<path d="m9.4998 0.5c0-0.27614 0.22386-0.5 0.5-0.5 0.2761 0 0.5 0.22386 0.5 0.5v8c0 0.27614-0.2239 0.5-0.5 0.5-0.27614 0-0.5-0.22386-0.5-0.5v-8z" />
			<path d="m12.5 2.5c0.2761 0 0.5 0.22386 0.5 0.5s-0.2239 0.5-0.5 0.5h-5c-0.27614 0-0.5-0.22386-0.5-0.5s0.22386-0.5 0.5-0.5h5z" />
			<path d="m11.767 6.5c0.2391 0.13807 0.3211 0.44387 0.183 0.68301-0.1381 0.23915-0.4439 0.32109-0.683 0.18302l-3.0311-1.75c-0.23914-0.13807-0.32108-0.44386-0.18301-0.68301 0.13807-0.23914 0.44387-0.32108 0.68301-0.18301l3.0311 1.75z" />
			<path d="m4.0204 20.325c-0.02331 0.2751-0.2444 0.4997-0.52055 0.4997-0.27614 0-0.50219-0.225-0.48228-0.5004 0.13694-1.894 1.0536-3.1428 2.266-4.2084 0.08554-0.0751 0.19598-0.1155 0.30986-0.1155 0.46078 0 0.66109 0.5962 0.31561 0.9011-1.059 0.9346-1.7621 1.9296-1.8886 3.4235z" />
		</svg>
	);
};

export default Dome;
