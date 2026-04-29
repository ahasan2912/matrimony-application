const range = (count) => Array.from({ length: count }, (_, index) => index);

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Block = ({ className = "", children }) => (
    <div className={cn("rounded-2xl bg-[#F6DDE4]", className)}>
        {children}
    </div>
);

const Line = ({ className = "" }) => (
    <Block className={cn("h-4 rounded-full", className)} />
);

const Circle = ({ className = "" }) => (
    <Block className={cn("rounded-full", className)} />
);

const NavbarSkeleton = () => (
    <nav className="sticky top-0 z-40 bg-[#FFF1F3] py-2 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
            <div className="hidden items-center gap-5 lg:flex">
                {range(6).map((item) => (
                    <Line key={item} className="h-4 w-20 bg-[#EEC9D3]" />
                ))}
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
                <Line className="hidden h-10 w-24 rounded-xl bg-[#F2D488] lg:block" />
                <Line className="hidden h-10 w-28 rounded-xl bg-white lg:block" />
                <Circle className="h-10 w-10 bg-white" />
                <Circle className="h-10 w-10 bg-white" />
                <Line className="h-10 w-12 rounded-xl bg-white lg:hidden" />
            </div>
        </div>
    </nav>
);

const FooterSkeleton = () => (
    <footer className="w-full">
        <div className="bg-[#FFF0F3] px-4 py-12 md:px-16 lg:px-24">
            <div className="mx-auto max-w-7xl space-y-8">
                <Line className="h-10 w-32 bg-[#EEC9D3]" />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Line className="h-6 w-44 bg-[#EEC9D3]" />
                        <Line className="w-full max-w-64" />
                        <Line className="w-full max-w-52" />
                    </div>

                    <div className="space-y-4">
                        {range(3).map((item) => (
                            <Line key={item} className="w-36" />
                        ))}
                    </div>

                    <div className="space-y-4">
                        {range(2).map((item) => (
                            <Line key={item} className="w-36" />
                        ))}
                    </div>

                    <div className="flex items-start gap-3 md:justify-end">
                        {range(3).map((item) => (
                            <Circle key={item} className="h-10 w-10" />
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-[#B30030] px-6 py-4 md:px-16 lg:px-24">
            <div className="mx-auto max-w-7xl">
                <Line className="h-4 w-52 bg-white/35" />
            </div>
        </div>
    </footer>
);

const SiteShell = ({ children }) => (
    <div className="min-h-screen bg-white">
        <NavbarSkeleton />
        <main>{children}</main>
        <FooterSkeleton />
    </div>
);

const ProfileGridCardSkeleton = () => (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-[#F3E1E6]">
        <Block className="aspect-[3/4] rounded-none bg-[#EFD7DE]" />
        <div className="space-y-3 p-4">
            <div className="flex items-center gap-2">
                <Line className="h-5 w-32 bg-[#EEC9D3]" />
                <Circle className="h-5 w-5 bg-[#EEC9D3]" />
            </div>
            <div className="flex flex-wrap gap-2">
                <Line className="h-6 w-20 bg-[#F8E8ED]" />
                <Line className="h-6 w-16 bg-[#F8E8ED]" />
            </div>
            <Line className="w-full max-w-52" />
        </div>
    </div>
);

const AuthContentSkeleton = () => (
    <section className="grid min-h-[calc(100vh-174px)] grid-cols-1 md:grid-cols-2">
        <div className="relative flex min-h-80 items-end bg-[#5B1F31] p-8 md:p-16">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 w-full max-w-md space-y-4">
                <Line className="h-10 w-56 bg-white/30" />
                <Line className="h-10 w-72 bg-white/20" />
                <Line className="w-full max-w-80 bg-white/20" />
            </div>
        </div>

        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6">
            <div className="w-full max-w-lg rounded-[2rem] border border-[#F8D7DF] bg-[#FFF2F5] p-8 shadow-sm md:p-12">
                <div className="space-y-4 text-center">
                    <Line className="mx-auto h-8 w-64 bg-[#EEC9D3]" />
                    <Line className="mx-auto w-full max-w-sm" />
                    <Line className="mx-auto w-full max-w-xs" />
                </div>

                <div className="mt-10 space-y-4">
                    <Line className="h-14 w-full rounded-full bg-[#C78396]" />
                    <Line className="h-14 w-full rounded-full bg-[#C78396]" />
                </div>

                <Line className="mx-auto mt-8 h-4 w-52" />
            </div>
        </div>
    </section>
);

const DiscoverContentSkeleton = ({ count = 10 }) => (
    <section className="mx-auto min-h-screen max-w-7xl bg-white px-4 py-5">
        <div className="mb-8 flex gap-3 overflow-x-auto border-b border-[#F3E1E6] pb-4">
            {range(3).map((item) => (
                <Line
                    key={item}
                    className={cn(
                        "h-11 w-36 rounded-full",
                        item === 0 ? "bg-[#C78396]" : "bg-[#F4E6EA]",
                    )}
                />
            ))}
        </div>

        <div className="mb-8 space-y-3">
            <div className="flex items-center gap-2">
                <Circle className="h-7 w-7 bg-[#EEC9D3]" />
                <Line className="h-6 w-64 bg-[#EEC9D3]" />
            </div>
            <Line className="w-full max-w-4xl" />
            <Line className="w-full max-w-3xl" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {range(count).map((item) => (
                <ProfileGridCardSkeleton key={item} />
            ))}
        </div>
    </section>
);

const MatchesContentSkeleton = () => (
    <section className="mx-auto my-12 flex max-w-7xl flex-col gap-8 bg-white px-4 md:flex-row">
        <div className="w-full md:w-1/3">
            <div className="overflow-hidden rounded-3xl ring-1 ring-[#F3E1E6]">
                <Block className="aspect-[4/5] rounded-none bg-[#EFD7DE]" />
                <div className="space-y-4 bg-[#FAF6F7] p-6">
                    <div className="flex items-center gap-2">
                        <Line className="h-7 w-40 bg-[#EEC9D3]" />
                        <Circle className="h-6 w-6 bg-[#EEC9D3]" />
                    </div>
                    <Line className="h-7 w-36 rounded-full bg-[#DDD1D5]" />
                    <div className="flex flex-wrap gap-2">
                        <Line className="h-7 w-24 rounded-full bg-[#DDD1D5]" />
                        <Line className="h-7 w-20 rounded-full bg-[#DDD1D5]" />
                        <Line className="h-7 w-28 rounded-full bg-[#DDD1D5]" />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex gap-5">
                {range(4).map((item) => (
                    <Circle key={item} className="h-14 w-14" />
                ))}
            </div>
        </div>

        <div className="flex-1 space-y-8">
            <div className="space-y-4">
                <Line className="h-6 w-28 bg-[#EEC9D3]" />
                <Line className="w-full max-w-2xl" />
                <Line className="w-full max-w-2xl" />
                <div className="flex flex-wrap gap-3">
                    <Line className="h-8 w-28 rounded-full bg-[#F4E6EA]" />
                    <Line className="h-8 w-32 rounded-full bg-[#F4E6EA]" />
                    <Line className="h-8 w-36 rounded-full bg-[#F4E6EA]" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {range(4).map((item) => (
                    <div key={item} className="space-y-4">
                        <Line className="h-6 w-40 bg-[#EEC9D3]" />
                        <div className="flex flex-wrap gap-2">
                            <Line className="h-8 w-28 rounded-full bg-[#F4E6EA]" />
                            <Line className="h-8 w-24 rounded-full bg-[#F4E6EA]" />
                            <Line className="h-8 w-32 rounded-full bg-[#F4E6EA]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ChatListContentSkeleton = ({ count = 7 }) => (
    <section className="mx-auto flex min-h-screen max-w-7xl px-3 pt-5">
        <div className="w-full rounded-2xl bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-[#F3E1E6] pb-4 md:flex-row md:items-center md:pb-0">
                <div className="flex gap-3 overflow-x-auto py-5">
                    {range(3).map((item) => (
                        <Line
                            key={item}
                            className={cn(
                                "h-11 w-32 rounded-full",
                                item === 0 ? "bg-[#C78396]" : "bg-[#F4E6EA]",
                            )}
                        />
                    ))}
                </div>

                <Line className="h-11 w-full max-w-md rounded-full" />
            </div>

            <div className="divide-y divide-[#F3E1E6]">
                {range(count).map((item) => (
                    <div key={item} className="flex items-center gap-3 px-2 py-4">
                        <Circle className="h-14 w-14 bg-[#EFD7DE]" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <Line className="h-4 w-36 bg-[#EEC9D3]" />
                                <Line className="h-5 w-8 rounded-md bg-[#C78396]" />
                            </div>
                            <Line className="w-full max-w-64" />
                        </div>
                        <Line className="h-3 w-12" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ChatBoxContentSkeleton = () => (
    <section className="mx-auto my-10 flex max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-[#F3E1E6] bg-[#F5F5F5]">
        <div className="flex items-center justify-between border-b border-[#E8D8DD] px-4 py-4">
            <div className="flex items-center gap-3">
                <Circle className="h-8 w-8" />
                <Circle className="h-14 w-14 bg-[#EFD7DE]" />
                <div className="space-y-2">
                    <Line className="h-5 w-40 bg-[#EEC9D3]" />
                    <Line className="h-4 w-20 bg-[#D6E8DA]" />
                </div>
            </div>

            <div className="flex gap-3">
                {range(3).map((item) => (
                    <Circle key={item} className="h-10 w-10" />
                ))}
            </div>
        </div>

        <div className="space-y-6 bg-[#FAFAFA] p-4">
            <div className="flex items-center gap-2">
                <Line className="h-1 flex-1 rounded-full bg-[#F3E1E6]" />
                <Line className="h-3 w-14 bg-[#EEC9D3]" />
                <Line className="h-1 flex-1 rounded-full bg-[#F3E1E6]" />
            </div>

            {range(5).map((item) => (
                <div
                    key={item}
                    className={cn(
                        "flex items-end gap-2",
                        item % 2 === 0 ? "justify-start" : "justify-end",
                    )}
                >
                    {item % 2 === 0 && <Circle className="h-8 w-8 bg-[#EFD7DE]" />}
                    <div className="space-y-2">
                        <Line className="h-16 w-72 max-w-full rounded-3xl bg-white" />
                        <Line className="h-3 w-20" />
                    </div>
                    {item % 2 !== 0 && <Circle className="h-8 w-8 bg-[#EFD7DE]" />}
                </div>
            ))}
        </div>

        <div className="bg-white p-4">
            <div className="flex items-center gap-2">
                <Circle className="h-12 w-12 bg-[#F4E6EA]" />
                <Line className="h-12 flex-1 rounded-2xl" />
            </div>
        </div>
    </section>
);

const VerificationContentSkeleton = ({ count = 4 }) => (
    <section className="mx-auto min-h-screen max-w-7xl space-y-6 bg-white px-4 pt-10">
        <div className="space-y-3">
            <Line className="h-8 w-40 bg-[#EEC9D3]" />
            <Line className="w-full max-w-3xl" />
            <Line className="w-full max-w-2xl" />
        </div>

        <div className="max-w-lg space-y-3">
            <Line className="h-4 w-44 bg-[#EEC9D3]" />
            <Block className="h-2.5 rounded-full bg-[#F4E6EA]">
                <div className="h-2.5 w-1/3 rounded-full bg-[#C78396]" />
            </Block>
        </div>

        <div className="space-y-4">
            {range(count).map((item) => (
                <div
                    key={item}
                    className="rounded-3xl border border-[#F3E1E6] bg-white p-5 shadow-sm"
                >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-3">
                            <Line className="h-5 w-44 bg-[#EEC9D3]" />
                            <Line className="w-full max-w-2xl" />
                        </div>
                        <Line className="h-11 w-36 rounded-full bg-[#C78396]" />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const DashboardContentSkeleton = ({ count = 4 }) => (
    <div className="flex min-h-screen overflow-hidden bg-slate-50">
        <aside className="hidden w-66.5 border-r border-gray-300 bg-[#2F1E54] lg:block">
            <div className="flex h-full flex-col py-4 pl-4 pr-5">
                <Line className="h-10 w-28 bg-white/20" />
                <div className="mt-6 space-y-3">
                    {range(8).map((item) => (
                        <Line key={item} className="h-12 w-full rounded-xl bg-white/12" />
                    ))}
                </div>
                <Line className="mt-auto h-10 w-28 bg-white/15" />
            </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center justify-between bg-white/80 px-4 py-3 backdrop-blur-md md:px-8">
                <div className="flex items-center gap-4">
                    <Circle className="h-10 w-10 bg-[#EFD7DE] lg:hidden" />
                    <Line className="h-10 w-56 rounded-xl bg-[#F4E6EA]" />
                </div>
                <Circle className="h-10 w-10 bg-[#EFD7DE]" />
            </header>

            <main className="flex-1 space-y-6 bg-white p-4 md:p-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {range(count).map((item) => (
                        <div
                            key={item}
                            className="rounded-3xl border border-[#F3E1E6] bg-[#FFF8FA] p-5"
                        >
                            <Line className="h-4 w-28 bg-[#EEC9D3]" />
                            <Line className="mt-4 h-9 w-20 bg-[#C78396]" />
                            <Line className="mt-4 w-full max-w-40" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                    <div className="rounded-3xl border border-[#F3E1E6] bg-white p-6">
                        <Line className="h-6 w-48 bg-[#EEC9D3]" />
                        <div className="mt-6 space-y-4">
                            {range(5).map((item) => (
                                <Line key={item} className="h-14 w-full rounded-2xl bg-[#F8F1F4]" />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-[#F3E1E6] bg-white p-6">
                        <Line className="h-6 w-40 bg-[#EEC9D3]" />
                        <div className="mt-6 space-y-5">
                            {range(4).map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <Circle className="h-12 w-12 bg-[#EFD7DE]" />
                                    <div className="flex-1 space-y-2">
                                        <Line className="h-4 w-32" />
                                        <Line className="h-4 w-24" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
);

const ProfileCardSkeleton = () => (
    <div className="w-full rounded-2xl border border-[#F3E1E6] bg-linear-to-b from-[#F5F5F5] to-[#FFEFF1] p-5 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
            <Circle className="h-14 w-14 border-2 border-[#C78396] bg-[#EFD7DE]" />
            <div className="space-y-2">
                <Line className="h-5 w-36 bg-[#EEC9D3]" />
                <Line className="h-4 w-24" />
            </div>
        </div>

        <div className="space-y-2">
            {range(3).map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl bg-white/70 p-3">
                    <Line className="h-4 w-36" />
                    <Circle className="h-5 w-5" />
                </div>
            ))}
        </div>

        <Line className="mt-6 h-11 w-32 rounded-full bg-[#C78396]" />
    </div>
);

const SectionContentSkeleton = ({ count = 6 }) => (
    <section className="mx-auto min-h-[70vh] max-w-7xl space-y-6 px-4 py-8">
        <div className="space-y-3">
            <Line className="h-8 w-48 bg-[#EEC9D3]" />
            <Line className="w-full max-w-3xl" />
            <Line className="w-full max-w-2xl" />
        </div>

        <div className="flex gap-3 overflow-x-auto">
            <Line className="h-11 w-32 rounded-full bg-[#C78396]" />
            <Line className="h-11 w-28 rounded-full bg-[#F4E6EA]" />
            <Line className="h-11 w-36 rounded-full bg-[#F4E6EA]" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {range(count).map((item) => (
                <div
                    key={item}
                    className="rounded-3xl border border-[#F3E1E6] bg-white p-5 shadow-sm"
                >
                    <Block className="h-44 rounded-2xl bg-[#F8E8ED]" />
                    <div className="mt-4 space-y-3">
                        <Line className="h-5 w-40 bg-[#EEC9D3]" />
                        <Line className="w-full" />
                        <Line className="w-full max-w-48" />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const Skeleton = ({ variant = "content", count, className = "" }) => {
    let content;

    switch (variant) {
        case "home":
        case "auth":
            content = (
                <SiteShell>
                    <AuthContentSkeleton />
                </SiteShell>
            );
            break;
        case "discover":
            content = (
                <SiteShell>
                    <DiscoverContentSkeleton count={count ?? 10} />
                </SiteShell>
            );
            break;
        case "matches":
            content = (
                <SiteShell>
                    <MatchesContentSkeleton />
                </SiteShell>
            );
            break;
        case "chat":
            content = (
                <SiteShell>
                    <ChatListContentSkeleton count={count ?? 7} />
                </SiteShell>
            );
            break;
        case "chatbox":
            content = (
                <SiteShell>
                    <ChatBoxContentSkeleton />
                </SiteShell>
            );
            break;
        case "verification":
            content = (
                <SiteShell>
                    <VerificationContentSkeleton count={count ?? 4} />
                </SiteShell>
            );
            break;
        case "dashboard":
            content = <DashboardContentSkeleton count={count ?? 4} />;
            break;
        case "profile-card":
            content = <ProfileCardSkeleton />;
            break;
        case "section":
            content = <SectionContentSkeleton count={count ?? 6} />;
            break;
        default:
            content = (
                <SiteShell>
                    <SectionContentSkeleton count={count ?? 6} />
                </SiteShell>
            );
    }

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading content"
            className={cn("animate-pulse", className)}
        >
            <span className="sr-only">Loading content</span>
            {content}
        </div>
    );
};

export default Skeleton;
