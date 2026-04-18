import { useTranslations } from "next-intl";

export default function ManageSubscription() {
    const t = useTranslations("manageSubscription");
    return (
        <div className="product-page">
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
        </div>
    )
}
