import React, { useRef, useState, useEffect } from 'react';

type DropdownProps = {
    items: any[],
    onAdd: (id: string) => void,
}

export const Dropdown = ({ items, onAdd }: DropdownProps) => {
    const [open, setOpen] = useState<boolean>(false);

    if (items.length <= 0) {
        return <p>No currencies to be shown</p>;
    }

    // Function to close dropdown when clicking outside the element
    function OutsideClick(props: OutsideClickProps) {
        const wrapperRef = useRef(null);
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                    if (open) setOpen(!open);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);  // Unbind efter clean up
            };
        }, [wrapperRef]);
        return <div ref={wrapperRef}>{props.children}</div>;
    }


    return (
        <OutsideClick>
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setOpen(!open)}> Add currencies</button>
                <ul className={"dropdown-menu scrollable-menu " + (open ? "show" : "")} aria-labelledby="dropdownMenuButton1">
                    {items.map((i) => {
                        return <li key={i.id} className="dropdown-item" onClick={() => onAdd(i.id)}><p>{i.name}</p></li>
                    })}
                </ul>
            </div>
        </OutsideClick>
    )
}

export default Dropdown;

type OutsideClickProps = {
    children: JSX.Element[] | JSX.Element
};
