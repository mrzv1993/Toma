import svgPaths from "./svg-ttq4uieao3";

function Heading() {
  return (
    <div className="h-[28.797px] relative shrink-0 w-[55.547px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28.797px] items-start relative w-[55.547px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.8px] not-italic relative shrink-0 text-[24px] text-nowrap text-white tracking-[0.0703px] whitespace-pre">toma</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[129px] not-italic text-[14px] text-nowrap text-right text-white top-0 tracking-[-0.1504px] translate-x-[-100%] whitespace-pre">mrzvv1993@mail.ru</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_12.5%_29.17%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-10%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
            <path d={svgPaths.p6680d80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[37.5%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 2">
            <path d="M10.8333 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_62.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 17">
            <path d={svgPaths.p297e5680} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[21px] relative shrink-0 w-[164.195px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[21px] items-center relative w-[164.195px]">
        <Paragraph />
        <Button />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#1a1a1a] h-[29.797px] relative shrink-0 w-[1343px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[29.797px] items-center justify-between pb-px pt-0 px-0 relative w-[1343px]">
        <Heading />
        <Container />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[26px] relative shrink-0 w-[75.594px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26px] relative w-[75.594px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26px] left-0 not-italic text-[20px] text-nowrap text-white top-0 tracking-[-0.4492px] whitespace-pre">Крючки</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13">
            <path d={svgPaths.p3a38ea30} id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[26px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[27px] relative shrink-0 w-[334.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[27px] items-start pb-px pt-0 px-0 relative w-[334.75px]">
        <Container2 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#a0a0a0] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Сделать</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[81.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-[81.141px]">
        <Icon2 />
        <Text />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.5px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 1">
            <path d="M0.5 0.5H7.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 8">
            <path d="M0.5 0.5V7.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[12px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[12px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
            <path d="M0.5 0.5H9.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p1aa5b500} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p16eb4200} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 grow h-[12px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[12px] items-start relative w-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[12px] opacity-0 relative shrink-0 w-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[12px] items-start relative w-[28px]">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#1a1a1a] content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.977px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[61.977px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Крючок 1</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#252525] h-[16px] relative rounded-[4px] shrink-0 w-[7.242px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[7.242px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a0a0] text-[12px] text-nowrap top-px whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-full">
        <Icon5 />
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#a0a0a0] text-[12px] text-center text-nowrap whitespace-pre">✎</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[21px] relative rounded-[4px] shrink-0 w-[10.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4px] px-0 relative w-[10.938px]">
        <Text3 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
            <path d="M0.5 0.5H9.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p1aa5b500} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p16eb4200} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4.5px] px-0 relative w-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[21px] opacity-0 relative shrink-0 w-[26.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[21px] items-start relative w-[26.938px]">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function HookItem() {
  return (
    <div className="bg-neutral-950 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="HookItem">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[23px] items-start p-px relative w-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[56.633px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[56.633px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Еще одн</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-full">
        <Icon7 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#a0a0a0] text-[12px] text-center text-nowrap whitespace-pre">✎</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[21px] relative rounded-[4px] shrink-0 w-[10.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4px] px-0 relative w-[10.938px]">
        <Text5 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
            <path d="M0.5 0.5H9.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p1aa5b500} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p16eb4200} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4.5px] px-0 relative w-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[21px] opacity-0 relative shrink-0 w-[26.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[21px] items-start relative w-[26.938px]">
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function HookItem1() {
  return (
    <div className="bg-neutral-950 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="HookItem">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[23px] items-start p-px relative w-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[64.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[64.953px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Еще одни</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-full">
        <Icon9 />
        <Text6 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#a0a0a0] text-[12px] text-center text-nowrap whitespace-pre">✎</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[21px] relative rounded-[4px] shrink-0 w-[10.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4px] px-0 relative w-[10.938px]">
        <Text7 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
            <path d="M0.5 0.5H9.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p1aa5b500} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p16eb4200} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4.5px] px-0 relative w-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[21px] opacity-0 relative shrink-0 w-[26.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[21px] items-start relative w-[26.938px]">
        <Button8 />
        <Button9 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function HookItem2() {
  return (
    <div className="bg-neutral-950 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="HookItem">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[23px] items-start p-px relative w-full">
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[52.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[52.938px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Помыть</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-[#252525] h-[16px] relative rounded-[4px] shrink-0 w-[5.57px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[5.57px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a0a0] text-[12px] text-nowrap top-px whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-full">
        <Icon11 />
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#a0a0a0] text-[12px] text-center text-nowrap whitespace-pre">✎</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[21px] relative rounded-[4px] shrink-0 w-[10.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4px] px-0 relative w-[10.938px]">
        <Text10 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
            <path d="M0.5 0.5H9.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p1aa5b500} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p16eb4200} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4.5px] px-0 relative w-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[21px] opacity-0 relative shrink-0 w-[26.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[21px] items-start relative w-[26.938px]">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function HookItem3() {
  return (
    <div className="bg-neutral-950 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="HookItem">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[23px] items-start p-px relative w-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2.66667 6H13.3333" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M2.66667 10H13.3333" id="Vector_2" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M6.66667 2L5.33333 14" id="Vector_3" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          <path d="M10.6667 2L9.33333 14" id="Vector_4" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[71.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[71.891px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Позвонить</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="bg-[#252525] h-[16px] relative rounded-[4px] shrink-0 w-[7.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[7.422px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a0a0] text-[12px] text-nowrap top-px whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-full">
        <Icon13 />
        <Text11 />
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex h-[14px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#a0a0a0] text-[12px] text-center text-nowrap whitespace-pre">✎</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[21px] relative rounded-[4px] shrink-0 w-[10.938px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4px] px-0 relative w-[10.938px]">
        <Text13 />
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[12px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 1">
            <path d="M0.5 0.5H9.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p1aa5b500} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 3">
            <path d={svgPaths.p16eb4200} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 4">
            <path d="M0.5 0.5V3.5" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[21px] items-start pb-0 pt-[4.5px] px-0 relative w-full">
        <Icon14 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[21px] opacity-0 relative shrink-0 w-[26.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[21px] items-start relative w-[26.938px]">
        <Button12 />
        <Button13 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function HookItem4() {
  return (
    <div className="bg-neutral-950 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="HookItem">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[23px] items-start p-px relative w-full">
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[115px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[115px] items-start pl-px pr-0 py-0 relative w-full">
          <HookItem />
          <HookItem1 />
          <HookItem2 />
          <HookItem3 />
          <HookItem4 />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[334.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[334.75px]">
        <Container6 />
        <Container22 />
      </div>
    </div>
  );
}

function HooksColumn() {
  return (
    <div className="[grid-area:1_/_1] bg-[#1a1a1a] h-[902.203px] justify-self-stretch relative shrink-0" data-name="HooksColumn">
      <div className="box-border content-stretch flex flex-col h-[902.203px] items-start overflow-clip pl-0 pr-px py-0 relative rounded-[inherit] w-full">
        <Container3 />
        <Container23 />
      </div>
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[26px] relative shrink-0 w-[98.57px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26px] relative w-[98.57px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26px] left-0 not-italic text-[20px] text-nowrap text-white top-0 tracking-[-0.4492px] whitespace-pre">Входящие</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon15 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[26px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Button14 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="basis-0 bg-neutral-950 grow h-[23px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[23px] items-center overflow-clip relative rounded-[inherit] w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[-0.1504px] whitespace-pre">Быстрая задача...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-blue-500 h-[23px] opacity-50 relative rounded-[4px] shrink-0 w-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[23px] items-start pb-0 pt-[3.5px] px-0 relative w-[16px]">
        <Icon16 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-start relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Button15 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[50px] relative shrink-0 w-[334.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[50px] items-start pb-px pt-0 px-0 relative w-[334.75px]">
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="basis-0 grow h-[19.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.594px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.6px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Список задач</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[24px] relative shrink-0 w-[20.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[20.938px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#666666] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[21px]">(2)</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[24px] relative shrink-0 w-[125.641px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[24px] items-center relative w-[125.641px]">
        <Heading3 />
        <Text14 />
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="box-border content-stretch flex h-[25px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container27 />
      <Button16 />
    </div>
  );
}

function Button17() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#666666] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[20px]" />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Присесть 8 раз</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[62.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] overflow-clip relative rounded-[inherit] w-[62.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-px whitespace-pre">Позвонить</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
            <path d={svgPaths.p2bb3ce80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
            <path d={svgPaths.pd604100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="opacity-0 relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon18 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="box-border content-stretch flex gap-[12px] h-[22px] items-center pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Button17 />
      <Paragraph1 />
      <Text15 />
      <Button18 />
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#666666] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[20px]" />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Почистить зубы</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 size-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-0" />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
            <path d={svgPaths.p2bb3ce80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
            <path d={svgPaths.pd604100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="opacity-0 relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon19 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[12px] h-[21px] items-center relative shrink-0 w-full" data-name="Container">
      <Button19 />
      <Paragraph2 />
      <Container30 />
      <Button20 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col h-[43px] items-start relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-neutral-950 h-[70px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[70px] items-start p-px relative w-full">
          <Container28 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="basis-0 grow h-[19.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.594px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.6px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Очередь</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[24px] relative shrink-0 w-[21.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[21.359px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#666666] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[22px]">(0)</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[24px] relative shrink-0 w-[90.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[24px] items-center relative w-[90.5px]">
        <Heading4 />
        <Text16 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
            <path d={svgPaths.p2bb3ce80} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
            <path d={svgPaths.pd604100} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[16px] items-start relative w-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-start relative w-[36px]">
        <Button21 />
        <Button22 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="box-border content-stretch flex h-[25px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container34 />
      <Container35 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[166.67px] not-italic text-[#666666] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Нет задач</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-neutral-950 h-[48px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start p-px relative w-full">
          <Container36 />
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="basis-0 grow h-[19.594px] min-h-px min-w-px relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.594px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.6px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">События</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[24px] relative shrink-0 w-[21.359px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[21.359px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#666666] text-[16px] top-[-0.5px] tracking-[-0.3125px] w-[22px]">(0)</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[24px] relative shrink-0 w-[91.539px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[24px] items-center relative w-[91.539px]">
        <Heading5 />
        <Text17 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "white", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button23() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon22 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
            <path d={svgPaths.p2bb3ce80} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 4">
            <path d={svgPaths.pd604100} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.666667 0.666667V4.66667" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.9843 0.1725 0.2118)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button24() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[16px] items-start relative w-full">
        <Icon23 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[16px] items-start relative w-[36px]">
        <Button23 />
        <Button24 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="box-border content-stretch flex h-[25px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container38 />
      <Container39 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[166.67px] not-italic text-[#666666] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Нет задач</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-neutral-950 h-[48px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[48px] items-start p-px relative w-full">
          <Container40 />
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col h-[166px] items-start relative shrink-0 w-full" data-name="Container">
      <Container33 />
      <Container37 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[334.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip relative rounded-[inherit] w-[334.75px]">
        <Container42 />
      </div>
    </div>
  );
}

function InboxColumn() {
  return (
    <div className="[grid-area:1_/_2] bg-[#1a1a1a] h-[902.203px] justify-self-stretch relative shrink-0" data-name="InboxColumn">
      <div className="box-border content-stretch flex flex-col h-[902.203px] items-start overflow-clip pl-0 pr-px py-0 relative rounded-[inherit] w-full">
        <Container26 />
        <Container43 />
      </div>
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[26px] left-0 top-0 w-[98.195px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26px] left-0 not-italic text-[20px] text-white top-0 tracking-[-0.4492px] w-[99px]">Спринт #1</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[73.891px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[73.891px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a0a0] text-[12px] top-px w-[74px]">В работе: 4ч</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[80.547px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[80.547px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#a0a0a0] text-[12px] text-nowrap top-px whitespace-pre">49м / 9ч (9%)</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-center justify-between left-0 top-[26px] w-[334.75px]" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container45() {
  return <div className="bg-blue-500 h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container46() {
  return (
    <div className="absolute bg-neutral-950 box-border content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-0 pr-[317.852px] py-0 rounded-[1.67772e+07px] top-[42px] w-[334.75px]" data-name="Container">
      <Container45 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[51px] relative shrink-0 w-[334.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[51px] relative w-[334.75px]">
        <Heading6 />
        <Container44 />
        <Container46 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="bg-red-500 h-[20px] relative rounded-[4px] shrink-0 w-[46.242px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[46.242px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Альфа</p>
      </div>
    </div>
  );
}

function Small() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[14.797px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[14.797px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[-10.45px] not-italic text-[#666666] text-[12px] top-[-0.4px] w-[25px]">1/1</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text20 />
      <Small />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon24 />
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Еще одна задача</p>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[16.67%] left-[58.33%] right-1/4 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 12">
            <path d={svgPaths.p18a41100} fill="var(--fill-0, #3B82F6)" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.2314 0.5098 0.9647)", fillOpacity: "1", stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-1/4 right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-6.25%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 12">
            <path d={svgPaths.p18a41100} fill="var(--fill-0, #3B82F6)" id="Vector" stroke="var(--stroke-0, #3B82F6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.2314 0.5098 0.9647)", fillOpacity: "1", stroke: "color(display-p3 0.2314 0.5098 0.9647)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button26() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon25 />
      </div>
    </div>
  );
}

function Small1() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[12px] text-blue-500 text-nowrap top-0 whitespace-pre">22м 22с</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[74.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[74.578px]">
        <Button26 />
        <Small1 />
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[23px] items-center p-px relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#333333] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Button25 />
      <Paragraph5 />
      <Container49 />
      <Button27 />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-neutral-950 h-[83px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[83px] items-start p-px relative w-full">
          <Container48 />
          <Container50 />
        </div>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="bg-orange-500 h-[20px] relative rounded-[4px] shrink-0 w-[32.898px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[32.898px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Бета</p>
      </div>
    </div>
  );
}

function Small2() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[16.469px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[16.469px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[-11.78px] not-italic text-[#666666] text-[12px] top-[-0.4px] w-[29px]">1/2</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text21 />
      <Small2 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon26 />
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Помыть байк</p>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button29() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon27 />
      </div>
    </div>
  );
}

function Small3() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button29 />
        <Small3 />
      </div>
    </div>
  );
}

function Button30() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button28 />
      <Paragraph6 />
      <Container53 />
      <Button30 />
    </div>
  );
}

function Container55() {
  return (
    <div className="bg-neutral-950 h-[83px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[83px] items-start p-px relative w-full">
          <Container52 />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="bg-amber-500 h-[20px] relative rounded-[4px] shrink-0 w-[46.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[46.094px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Гамма</p>
      </div>
    </div>
  );
}

function Small4() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.703px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.703px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-[-5.55px] not-italic text-[#666666] text-[12px] top-[-0.4px] w-[25px]">3/3</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text22 />
      <Small4 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon28 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Набрать воды</p>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button32() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon29 />
      </div>
    </div>
  );
}

function Small5() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button32 />
        <Small5 />
      </div>
    </div>
  );
}

function Button33() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button31 />
      <Paragraph7 />
      <Container57 />
      <Button33 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button34() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon30 />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Еще одна задача</p>
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button35() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon31 />
      </div>
    </div>
  );
}

function Small6() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">4м 5с</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button35 />
        <Small6 />
      </div>
    </div>
  );
}

function Button36() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button34 />
      <Paragraph8 />
      <Container59 />
      <Button36 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button37() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon32 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">3212</p>
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button38() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon33 />
      </div>
    </div>
  );
}

function Small7() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button38 />
        <Small7 />
      </div>
    </div>
  );
}

function Button39() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button37 />
      <Paragraph9 />
      <Container61 />
      <Button39 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col h-[69px] items-start relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Container60 />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-neutral-950 h-[92px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[92px] items-start p-px relative w-full">
          <Container56 />
          <Container63 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="bg-yellow-500 h-[20px] relative rounded-[4px] shrink-0 w-[50.438px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[50.438px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Дельта</p>
      </div>
    </div>
  );
}

function Small8() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.672px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.672px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] top-0 w-[19px]">3/4</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text23 />
      <Small8 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button40() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon34 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">123</p>
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button41() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon35 />
      </div>
    </div>
  );
}

function Small9() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button41 />
        <Small9 />
      </div>
    </div>
  );
}

function Button42() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button40 />
      <Paragraph10 />
      <Container66 />
      <Button42 />
    </div>
  );
}

function Icon36() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button43() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon36 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">фывфыв</p>
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button44() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon37 />
      </div>
    </div>
  );
}

function Small10() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button44 />
        <Small10 />
      </div>
    </div>
  );
}

function Button45() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button43 />
      <Paragraph11 />
      <Container68 />
      <Button45 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button46() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon38 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">1111</p>
      </div>
    </div>
  );
}

function Icon39() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button47() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon39 />
      </div>
    </div>
  );
}

function Small11() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">1м 22с</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[67.352px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[67.352px]">
        <Button47 />
        <Small11 />
      </div>
    </div>
  );
}

function Button48() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button46 />
      <Paragraph12 />
      <Container70 />
      <Button48 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col h-[69px] items-start relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Container69 />
      <Container71 />
    </div>
  );
}

function Container73() {
  return (
    <div className="bg-neutral-950 h-[92px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[92px] items-start p-px relative w-full">
          <Container65 />
          <Container72 />
        </div>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="bg-lime-500 h-[20px] relative rounded-[4px] shrink-0 w-[62.43px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[62.43px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Эпсилон</p>
      </div>
    </div>
  );
}

function Small12() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.5px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.5px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] top-0 w-[19px]">5/5</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text24 />
      <Small12 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button49() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">фыв</p>
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button50() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Small13() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button50 />
        <Small13 />
      </div>
    </div>
  );
}

function Button51() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button49 />
      <Paragraph13 />
      <Container75 />
      <Button51 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button52() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon42 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">фывфыв</p>
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button53() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon43 />
      </div>
    </div>
  );
}

function Small14() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button53 />
        <Small14 />
      </div>
    </div>
  );
}

function Button54() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button52 />
      <Paragraph14 />
      <Container77 />
      <Button54 />
    </div>
  );
}

function Icon44() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button55() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon44 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">123</p>
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button56() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon45 />
      </div>
    </div>
  );
}

function Small15() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button56 />
        <Small15 />
      </div>
    </div>
  );
}

function Button57() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button55 />
      <Paragraph15 />
      <Container79 />
      <Button57 />
    </div>
  );
}

function Icon46() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button58() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon46 />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Хорошо</p>
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button59() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon47 />
      </div>
    </div>
  );
}

function Small16() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 12с</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[67.352px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[67.352px]">
        <Button59 />
        <Small16 />
      </div>
    </div>
  );
}

function Button60() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button58 />
      <Paragraph16 />
      <Container81 />
      <Button60 />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col h-[115px] items-start relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Container78 />
      <Container80 />
      <Container82 />
      <Container78 />
    </div>
  );
}

function Container84() {
  return (
    <div className="bg-neutral-950 h-[138px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[138px] items-start p-px relative w-full">
          <Container74 />
          <Container83 />
        </div>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="bg-green-500 h-[20px] relative rounded-[4px] shrink-0 w-[42.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[42.234px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Дзета</p>
      </div>
    </div>
  );
}

function Small17() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.719px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.719px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] top-0 w-[19px]">5/6</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text25 />
      <Small17 />
    </div>
  );
}

function Icon48() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button61() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon48 />
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Тест</p>
      </div>
    </div>
  );
}

function Icon49() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button62() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon49 />
      </div>
    </div>
  );
}

function Small18() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">14м 49с</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[74.578px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[74.578px]">
        <Button62 />
        <Small18 />
      </div>
    </div>
  );
}

function Button63() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button61 />
      <Paragraph17 />
      <Container86 />
      <Button63 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button64() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon50 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Помыть посуду</p>
      </div>
    </div>
  );
}

function Icon51() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button65() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon51 />
      </div>
    </div>
  );
}

function Small19() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button65 />
        <Small19 />
      </div>
    </div>
  );
}

function Button66() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button64 />
      <Paragraph18 />
      <Container88 />
      <Button66 />
    </div>
  );
}

function Icon52() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button67() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon52 />
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">Посзвонить маме 28 ноября</p>
      </div>
    </div>
  );
}

function Icon53() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button68() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon53 />
      </div>
    </div>
  );
}

function Small20() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button68 />
        <Small20 />
      </div>
    </div>
  );
}

function Button69() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button67 />
      <Paragraph19 />
      <Container90 />
      <Button69 />
    </div>
  );
}

function Icon54() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button70() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon54 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">2222</p>
      </div>
    </div>
  );
}

function Icon55() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button71() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon55 />
      </div>
    </div>
  );
}

function Small21() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">6м 48с</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[67.352px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[67.352px]">
        <Button71 />
        <Small21 />
      </div>
    </div>
  );
}

function Button72() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button70 />
      <Paragraph20 />
      <Container92 />
      <Button72 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" style={{ stroke: "color(display-p3 0.4000 0.4000 0.4000)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button73() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon56 />
      </div>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-nowrap text-white top-0 tracking-[-0.1504px] whitespace-pre">3333</p>
      </div>
    </div>
  );
}

function Icon57() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/4 right-[16.67%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 14">
            <path d={svgPaths.p22337200} fill="var(--fill-0, #A0A0A0)" id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ fill: "color(display-p3 0.6275 0.6275 0.6275)", fillOpacity: "1", stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button74() {
  return (
    <div className="opacity-0 relative rounded-[4px] shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon57 />
      </div>
    </div>
  );
}

function Small22() {
  return (
    <div className="basis-0 grow h-[16.797px] min-h-px min-w-px relative shrink-0" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] text-nowrap top-0 whitespace-pre">0м 0с</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[60.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[16.797px] items-center relative w-[60.125px]">
        <Button74 />
        <Small22 />
      </div>
    </div>
  );
}

function Button75() {
  return (
    <div className="h-[21px] opacity-0 relative rounded-[4px] shrink-0 w-[10.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[10.672px]">
        <p className="absolute font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[21px] left-[5.5px] not-italic text-[#fb2c36] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">✕</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex gap-[8px] h-[23px] items-center relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <Button73 />
      <Paragraph21 />
      <Container94 />
      <Button75 />
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col h-[115px] items-start relative shrink-0 w-full" data-name="Container">
      <Container87 />
      <Container89 />
      <Container91 />
      <Container93 />
      <Container95 />
    </div>
  );
}

function Container97() {
  return (
    <div className="bg-neutral-950 h-[138px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[138px] items-start p-px relative w-full">
          <Container85 />
          <Container96 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="bg-teal-500 h-[20px] relative rounded-[4px] shrink-0 w-[25.898px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.898px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Эта</p>
      </div>
    </div>
  );
}

function Small23() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.055px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.055px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] top-0 w-[19px]">0/7</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text26 />
      <Small23 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[162.87px] not-italic text-[#666666] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Перетащите задачи сюда</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="bg-neutral-950 h-[83px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[83px] items-start p-px relative w-full">
          <Container98 />
          <Paragraph22 />
        </div>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="bg-cyan-500 h-[20px] relative rounded-[4px] shrink-0 w-[32.039px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[32.039px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Тета</p>
      </div>
    </div>
  );
}

function Small24() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.883px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.883px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] top-0 w-[19px]">0/8</p>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text27 />
      <Small24 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[162.87px] not-italic text-[#666666] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Перетащите задачи сюда</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="bg-neutral-950 h-[83px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[83px] items-start p-px relative w-full">
          <Container100 />
          <Paragraph23 />
        </div>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="bg-sky-500 h-[20px] relative rounded-[4px] shrink-0 w-[34.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[34.672px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-[0.5px] tracking-[-0.1504px] whitespace-pre">Йота</p>
      </div>
    </div>
  );
}

function Small25() {
  return (
    <div className="h-[16.797px] relative shrink-0 w-[18.859px]" data-name="Small">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.797px] relative w-[18.859px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.8px] left-0 not-italic text-[#666666] text-[12px] top-0 w-[19px]">0/9</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="box-border content-stretch flex h-[21px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Text28 />
      <Small25 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[162.87px] not-italic text-[#666666] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Перетащите задачи сюда</p>
    </div>
  );
}

function Container103() {
  return (
    <div className="bg-neutral-950 h-[83px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[83px] items-start p-px relative w-full">
          <Container102 />
          <Paragraph24 />
        </div>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[875px] items-start relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container55 />
      <Container64 />
      <Container73 />
      <Container84 />
      <Container97 />
      <Container99 />
      <Container101 />
      <Container103 />
    </div>
  );
}

function Container105() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[334.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start overflow-clip pl-0 pr-[8px] py-0 relative rounded-[inherit] w-[334.75px]">
        <Container104 />
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12949080} id="Vector" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          <path d="M2 2V5.33333H5.33333" id="Vector_2" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
          <path d="M8 4.66667V8L10.6667 9.33333" id="Vector_3" stroke="var(--stroke-0, #A0A0A0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6275 0.6275 0.6275)", strokeOpacity: "1" }} />
        </g>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[21px] relative shrink-0 w-[126.773px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[126.773px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-[63.5px] not-italic text-[#a0a0a0] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">История спринтов</p>
      </div>
    </div>
  );
}

function Button76() {
  return (
    <div className="h-[21px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[21px] items-center justify-center pl-0 pr-[0.008px] py-0 relative w-full">
          <Icon58 />
          <Text29 />
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="bg-[#1a1a1a] h-[22px] relative shrink-0 w-[334.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333333] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[22px] items-start pb-0 pt-px px-0 relative w-[334.75px]">
        <Button76 />
      </div>
    </div>
  );
}

function SprintColumn() {
  return (
    <div className="[grid-area:1_/_3] bg-[#1a1a1a] h-[902.203px] justify-self-stretch relative shrink-0" data-name="SprintColumn">
      <div className="box-border content-stretch flex flex-col h-[902.203px] items-start overflow-clip pl-0 pr-px py-0 relative rounded-[inherit] w-full">
        <Container47 />
        <Container105 />
        <Container106 />
      </div>
      <div aria-hidden="true" className="absolute border-[#333333] border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text30() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">00:00</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-0 w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text30 />
    </div>
  );
}

function Text31() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">01:00</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[60px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">02:00</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[120px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text32 />
    </div>
  );
}

function Text33() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">03:00</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[180px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text33 />
    </div>
  );
}

function Text34() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">04:00</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[240px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text34 />
    </div>
  );
}

function Text35() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">05:00</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[300px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text35 />
    </div>
  );
}

function Text36() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">06:00</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[360px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text36 />
    </div>
  );
}

function Text37() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">07:00</p>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[420px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text37 />
    </div>
  );
}

function Text38() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">08:00</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[480px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text38 />
    </div>
  );
}

function Text39() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">09:00</p>
      </div>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[540px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text39 />
    </div>
  );
}

function Text40() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">10:00</p>
      </div>
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[600px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text40 />
    </div>
  );
}

function Text41() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">11:00</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[660px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text41 />
    </div>
  );
}

function Text42() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">12:00</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[720px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text42 />
    </div>
  );
}

function Text43() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">13:00</p>
      </div>
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[780px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text43 />
    </div>
  );
}

function Text44() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">14:00</p>
      </div>
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[840px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text44 />
    </div>
  );
}

function Text45() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">15:00</p>
      </div>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[900px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text45 />
    </div>
  );
}

function Text46() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">16:00</p>
      </div>
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[960px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text46 />
    </div>
  );
}

function Text47() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">17:00</p>
      </div>
    </div>
  );
}

function Container124() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1020px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text47 />
    </div>
  );
}

function Text48() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">18:00</p>
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1080px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text48 />
    </div>
  );
}

function Text49() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">19:00</p>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1140px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text49 />
    </div>
  );
}

function Text50() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">20:00</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1200px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text50 />
    </div>
  );
}

function Text51() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">21:00</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1260px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text51 />
    </div>
  );
}

function Text52() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">22:00</p>
      </div>
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1320px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text52 />
    </div>
  );
}

function Text53() {
  return (
    <div className="bg-black h-[15px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[48px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#71717b] text-[10px] text-nowrap top-[0.5px] tracking-[0.1172px] whitespace-pre">23:00</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute box-border content-stretch flex h-[60px] items-start left-0 pb-0 pt-px px-0 top-[1380px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text53 />
    </div>
  );
}

function Container131() {
  return <div className="absolute bg-[rgba(239,68,68,0.19)] border-[0px_0px_0px_2px] border-red-500 border-solid h-[19.172px] left-[56px] opacity-90 rounded-[4px] top-[286.25px] w-[262.75px]" data-name="Container" />;
}

function Container132() {
  return <div className="absolute bg-[rgba(234,179,8,0.19)] border-[0px_0px_0px_2px] border-solid border-yellow-500 h-[4.68px] left-[56px] opacity-90 rounded-[4px] top-[305.43px] w-[262.75px]" data-name="Container" />;
}

function Container133() {
  return <div className="absolute bg-[rgba(234,179,8,0.19)] border-[0px_0px_0px_2px] border-solid border-yellow-500 h-[2.211px] left-[56px] opacity-90 rounded-[4px] top-[310.3px] w-[262.75px]" data-name="Container" />;
}

function Container134() {
  return <div className="absolute bg-[rgba(234,179,8,0.19)] border-[0px_0px_0px_2px] border-solid border-yellow-500 h-[1.367px] left-[56px] opacity-90 rounded-[4px] top-[312.52px] w-[262.75px]" data-name="Container" />;
}

function Container135() {
  return <div className="absolute bg-[rgba(234,179,8,0.19)] border-[0px_0px_0px_2px] border-solid border-yellow-500 h-[4.781px] left-[56px] opacity-90 rounded-[4px] top-[313.95px] w-[262.75px]" data-name="Container" />;
}

function Container136() {
  return <div className="absolute bg-[rgba(234,179,8,0.19)] border-[0px_0px_0px_2px] border-solid border-yellow-500 h-[1.992px] left-[56px] opacity-90 rounded-[4px] top-[318.83px] w-[262.75px]" data-name="Container" />;
}

function Container137() {
  return <div className="absolute bg-[rgba(245,158,11,0.19)] border-[0px_0px_0px_2px] border-amber-500 border-solid h-[2.836px] left-[56px] opacity-90 rounded-[4px] top-[321.03px] w-[262.75px]" data-name="Container" />;
}

function Container138() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[11px] left-0 not-italic text-[11px] text-nowrap text-zinc-200 top-0 tracking-[0.0645px] whitespace-pre">Еще одна задача</p>
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute bg-[rgba(239,68,68,0.19)] h-[22.367px] left-[56px] opacity-90 rounded-[4px] top-[377.11px] w-[262.75px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col h-[22.367px] items-start overflow-clip pl-[2px] pr-0 py-0 relative rounded-[inherit] w-[262.75px]">
        <Container138 />
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_2px] border-red-500 border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container140() {
  return (
    <div className="bg-[#f6339a] relative rounded-[1.67772e+07px] shrink-0 size-[8px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[1.67772e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[8px]" />
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute box-border content-stretch flex h-[9px] items-center left-0 pb-0 pt-px px-0 top-[399px] w-[326.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f6339a] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container140 />
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[1440px] relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Container108 />
      <Container109 />
      <Container110 />
      <Container111 />
      <Container112 />
      <Container113 />
      <Container114 />
      <Container115 />
      <Container116 />
      <Container117 />
      <Container118 />
      <Container119 />
      <Container120 />
      <Container121 />
      <Container122 />
      <Container123 />
      <Container124 />
      <Container125 />
      <Container126 />
      <Container127 />
      <Container128 />
      <Container129 />
      <Container130 />
      <Container131 />
      <Container132 />
      <Container133 />
      <Container134 />
      <Container135 />
      <Container136 />
      <Container137 />
      <Container139 />
      <Container141 />
    </div>
  );
}

function Container143() {
  return (
    <div className="absolute bg-black box-border content-stretch flex flex-col h-[831.203px] items-start left-px overflow-clip pl-0 pr-[8px] py-0 top-[71px] w-[334.75px]" data-name="Container">
      <Container142 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[26px] relative shrink-0 w-[95.516px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26px] relative w-[95.516px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26px] left-0 not-italic text-[20px] text-nowrap text-zinc-100 top-0 tracking-[-0.4492px] whitespace-pre">Таймлайн</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[36.125px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#71717b] text-[12px] text-nowrap top-px whitespace-pre">06:39</p>
      </div>
    </div>
  );
}

function Container145() {
  return (
    <div className="h-[26px] relative shrink-0 w-[334.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[26px] items-center justify-between relative w-[334.75px]">
        <Heading7 />
        <Container144 />
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[14.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[14.344px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[7px] not-italic text-[#71717b] text-[10px] text-center text-nowrap top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">пт</p>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[14px] relative shrink-0 w-[15.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[15.055px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[8px] not-italic text-[#71717b] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">21</p>
      </div>
    </div>
  );
}

function Button77() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center relative w-[40px]">
        <Text54 />
        <Text55 />
      </div>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[14.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[14.078px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[7.5px] not-italic text-[#71717b] text-[10px] text-center text-nowrap top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">сб</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[14px] relative shrink-0 w-[16.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[16.969px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[8px] not-italic text-[#71717b] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">22</p>
      </div>
    </div>
  );
}

function Button78() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center relative w-[40px]">
        <Text56 />
        <Text57 />
      </div>
    </div>
  );
}

function Text58() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[14.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[14.367px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[7.5px] not-italic text-[#71717b] text-[10px] text-center text-nowrap top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">вс</p>
      </div>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[14px] relative shrink-0 w-[17.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[17.313px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[9px] not-italic text-[#71717b] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">23</p>
      </div>
    </div>
  );
}

function Button79() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center relative w-[40px]">
        <Text58 />
        <Text59 />
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[15.477px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[15.477px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[8.5px] not-italic text-[#71717b] text-[10px] text-center text-nowrap top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">пн</p>
      </div>
    </div>
  );
}

function Text61() {
  return (
    <div className="h-[14px] relative shrink-0 w-[17.383px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[17.383px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[9px] not-italic text-[#71717b] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">24</p>
      </div>
    </div>
  );
}

function Button80() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center relative w-[40px]">
        <Text60 />
        <Text61 />
      </div>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[13.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[13.391px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[7px] not-italic text-[#71717b] text-[10px] text-center text-nowrap top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">вт</p>
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[14px] relative shrink-0 w-[17.203px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[17.203px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[9px] not-italic text-[#71717b] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">25</p>
      </div>
    </div>
  );
}

function Button81() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center relative w-[40px]">
        <Text62 />
        <Text63 />
      </div>
    </div>
  );
}

function Text64() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[14.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[14.156px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[7px] not-italic text-[#71717b] text-[10px] text-center text-nowrap top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">ср</p>
      </div>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[14px] relative shrink-0 w-[17.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[17.469px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-[9px] not-italic text-[#71717b] text-[14px] text-center text-nowrap top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">26</p>
      </div>
    </div>
  );
}

function Button82() {
  return (
    <div className="h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center relative w-[40px]">
        <Text64 />
        <Text65 />
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[10px] opacity-80 relative shrink-0 w-[13.867px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[10px] relative w-[13.867px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[10px] left-[7px] not-italic text-[10px] text-center text-nowrap text-white top-0 tracking-[0.1172px] translate-x-[-50%] uppercase whitespace-pre">чт</p>
      </div>
    </div>
  );
}

function Text67() {
  return (
    <div className="h-[14px] relative shrink-0 w-[17.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[14px] relative w-[17.172px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[14px] left-[9.5px] not-italic text-[14px] text-center text-nowrap text-white top-[0.5px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">27</p>
      </div>
    </div>
  );
}

function Button83() {
  return (
    <div className="bg-zinc-800 h-[44px] relative rounded-[4px] shrink-0 w-[40px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-700 inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-center justify-center p-px relative w-[40px]">
        <Text66 />
        <Text67 />
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[334.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-full items-center overflow-clip relative rounded-[inherit] w-[334.75px]">
        <Button77 />
        <Button78 />
        <Button79 />
        <Button80 />
        <Button81 />
        <Button82 />
        <Button83 />
      </div>
    </div>
  );
}

function Container147() {
  return (
    <div className="absolute bg-zinc-950 box-border content-stretch flex flex-col h-[71px] items-start left-px pb-px pt-0 px-0 top-0 w-[334.75px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-zinc-800 inset-0 pointer-events-none" />
      <Container145 />
      <Container146 />
    </div>
  );
}

function TimerColumn() {
  return (
    <div className="[grid-area:1_/_4] bg-zinc-950 h-[902.203px] justify-self-stretch relative shrink-0" data-name="TimerColumn">
      <div className="h-[902.203px] overflow-clip relative rounded-[inherit] w-full">
        <Container143 />
        <Container147 />
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-solid border-zinc-800 inset-0 pointer-events-none" />
    </div>
  );
}

function Container148() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1343px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-full relative w-[1343px]">
        <HooksColumn />
        <InboxColumn />
        <SprintColumn />
        <TimerColumn />
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-neutral-950 content-stretch flex flex-col h-[932px] items-start left-0 top-0 w-[1343px]" data-name="AppContent">
      <Container1 />
      <Container148 />
    </div>
  );
}

function Icon59() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6235 0.6235 0.6627)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 11">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6235 0.6235 0.6627)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button84() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-solid border-zinc-800 inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start pb-px pt-0 px-0 relative w-[16px]">
        <Icon59 />
      </div>
    </div>
  );
}

function Icon60() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, #9F9FA9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" style={{ stroke: "color(display-p3 0.6235 0.6235 0.6627)", strokeOpacity: "1" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button85() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon60 />
      </div>
    </div>
  );
}

function TimerColumn1() {
  return (
    <div className="absolute bg-zinc-900 h-[35px] left-[1301px] rounded-[12px] top-[853px] w-[18px]" data-name="TimerColumn">
      <div className="box-border content-stretch flex flex-col h-[35px] items-start overflow-clip p-px relative rounded-[inherit] w-[18px]">
        <Button84 />
        <Button85 />
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-zinc-800 inset-0 pointer-events-none rounded-[12px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

export default function Toma() {
  return (
    <div className="bg-neutral-950 relative size-full" data-name="toma">
      <AppContent />
      <TimerColumn1 />
    </div>
  );
}