import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

type BannerProps = {
    className?: string;
};

export function GateBanner(props: BannerProps) {

    return (
        <div
            className={
                props.className +
                " flex flex-row justify-between items-center rounded-xl bg-Corp3 py-3 pl-3"
            }
        >
            <div className={"flex flex-col items-center gap-1 text-xs "}>
                <Combobox className="lg:max-w-xs" openOnFocus={true}>
                    <ComboboxInput
                        className="bg-Corp2 rounded-md p-2"
                        spellCheck={false}
                        placeholder="Field 1"
                    />
                    <ComboboxPopover className="bg-Corp2 p-2">
                        <ComboboxList>
                            {/* <ComboboxOption
                                className="hover:bg-slate-500 rounded-md transition-colors "
                                value="Fayetteville"
                                onClick={() => {
                                    setWeatherArea("Fayetteville");
                                }}
                            />
                            <ComboboxOption
                                className="hover:bg-slate-500 rounded-md transition-colors "
                                value="Simsboro"
                                onClick={() => setWeatherArea("Simsboro")}
                            />
                            <ComboboxOption
                                className="hover:bg-slate-500 rounded-md transition-colors "
                                value="Magnolia"
                                onClick={() => setWeatherArea("Magnolia")}
                            /> */}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
            <div className="pr-3">
                <button onClick={() => (window.location.href = "/home")} className="rounded-xl text-xs p-2 bg-Corp2 flex flex-row gap-2 items-center hover:bg-Corp4 transition-colors">
                    Home
                </button>
            </div>

        </div>
    );
}

export default GateBanner;
