export default interface WikiResponse {
    api_urls?: {};
    content_urls?: {
        desktop?: {
            page?: string;
            revisions?: string;
            edit?: string;
            talk?: string;
        };
        mobile?: {
            page?: string;
            revisions?: string;
            edit?: string;
            talk?: string;
        };
    };
    description?: string;
    description_source?: string;
    dir?: string;
    displaytitle?: string;
    extract?: string;
	extract_html?: string;
    lang?: string;
    namespace?: {
        id: number,
        text: string;
    };
    originalimage?: {
        width: number;
        source: string;
        height: number;
    };
    pageid?: number;
    revision?: string;
    thumbnail?: {
        width: number;
        source: string;
        height: number;
    };
    tid?: string;
    timestamp?: Date;
	title?: string;
	titles?: {
        canonical: string;
        normalized: string;
        display: string
    };
    type?: string;
    wikibase_item?: string;
}
