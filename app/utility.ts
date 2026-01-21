
export const slugify = (text: string) =>
    text
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");


export const titleFromSlug = (slug: string) => {
    // 1. Replace hyphens with spaces
    let title = slug.replace(/-/g, " ");

    // 2. Capitalize words
    title = title.replace(/\b\w/g, c => c.toUpperCase());

    // 3. Add # before standalone number (Video 1 → Video #1)
    title = title.replace(/Video (\d+)/, "Video #$1");

    // 4. Convert last two numbers to time format (56 37 → (56:37))
    title = title.replace(/(\d+)\s(\d+)$/, "($1:$2)");

    return title;
};


export const getUser = () => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null
}
export function addLineBreaks(html: any) {
    if (!html) return "";

    // H2 se pehle <br>
    let updated = html.replace(/(<strong>)/gi, "<br/>$1");

    // H3 se pehle <br>
    updated = updated.replace(/(<strong>)/gi, "<br/>$1");

    return updated;
}
