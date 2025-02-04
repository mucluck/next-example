export type AnalyticsItemType = {
	item_id: string
	item_name: string | undefined // FIXME: Remove undefined after pass correctly value (product category)
	coupon?: string
	index?: number
	item_brand?: string
	item_category?: string
	item_category5?: string
	price?: number
	quantity?: number
}

export type AnalyticsDataType = {
	eventName: string
	flow?: string
	application?: string
	userId?: string | undefined
	step?: string
	result?: string
	type?: string
	currency?: string
	itemName?: string
	itemListName?: string
	itemCategory?: string
	value?: string
	paymentType?: string
	transactionId?: string
	items?: Array<AnalyticsItemType>
}
