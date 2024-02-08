import { faBars, faGear, faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Modal } from 'react-responsive-modal'
import UserModal from "./Modals";

type BannerProps = {
  userName: string;
  settingsLink: string;
  signOutLink: string;
  className?: string;
  children?: React.ReactNode;
};

export function UserBanner(props: BannerProps) {
  return (
    <div
      className={
        "flex flex-row rounded-xl bg-indigo-950 gap-4 py-2 pl-5 pr-5 items-center " +
        props.className
      }
    >
      <h1>{props.userName}</h1>
      {/* <button onClick={() => { setOpen(!open) }}><FontAwesomeIcon icon={faBars} /></button> */}
      <UserModal bgColor={"bg-gray-500"} settingsLink="/" signoutLink="/" />
      {/* <div className={'flex flex-col'}>
                    <div className='flex gap-2 items-center'>
                        <Link to={props.settingsLink}>{"Settings"}</Link>
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                    <div className={'flex gap-2 items-center'}>
                        <Link to={props.signOutLink}>{"Sign Out"}</Link>
                        <FontAwesomeIcon icon={faDoorOpen} />
                    </div> */}
      {/* </div> */}
    </div>
  );
}

export default UserBanner;
