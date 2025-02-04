import { createContext, useContext } from 'react'
import type { AnalyticsDataType } from '@/shared/types/metrics'

type AnalyticsContextType = {
	sendEvent: (data: AnalyticsDataType) => void
}

export const AnalyticsContext = createContext<AnalyticsContextType>({ sendEvent: () => Function })

AnalyticsContext.displayName = 'AnalyticsContext'

export const AnalyticsContextProvider = AnalyticsContext.Provider
export const AnalyticsContextConsumer = AnalyticsContext.Consumer
export const useAnalytics = () => {
	const context = useContext(AnalyticsContext)

	if (context === undefined) {
		throw Error('useAnalytics must be used within an AnalyticsProvider')
	}

	return context
}
