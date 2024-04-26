import create from 'zustand';

const useBannerStore = create((set) => ({
  content: "750 TL ve üzeri alışverişlerinizde kargo ücretsiz!",
  isBannerVisible: true, // Başlangıçta banner'ı göster
  hideBanner: () => set({ isBannerVisible: false }), // Banner gizleme işlevi
}));

export default useBannerStore;
