import { UserIcon } from "@heroicons/react/16/solid";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type Props = {
  shiftDetails: {
    category: string;
    roles: {
      role: string;
      members: {
        id: string;
        name: string;
        qualification: string;
        disableString: string;
        displayName: string;
      }[];
    }[];
  }[];
};

const ShiftCategoryCardPresentation = ({ shiftDetails }: Props) => {
  return shiftDetails.map((detail, index) => {
    return (
      <div className="m-2 sm:flex-1" key={index}>
        <Card>
          <CardHeader>
            <CardTitle>{detail.category}</CardTitle>
          </CardHeader>
          <CardContent>
            {detail.roles.map((role) => {
              return role.members.map((member, idx) => {
                return (
                  <div
                    className="mb-2 flex flex-row items-center"
                    key={`${index}-${idx}`}
                  >
                    <UserIcon className="w-5 text-zinc-300" />
                    <p className="ml-2">{member.name}</p>
                    <p className="ml-4 text-xs text-zinc-500">{role.role}</p>
                  </div>
                );
              });
            })}
          </CardContent>
        </Card>
      </div>
    );
  });
};

const ShiftCategoryCardContainer = ({ shiftDetails }: Props) => {
  return <ShiftCategoryCardPresentation shiftDetails={shiftDetails} />;
};

export default ShiftCategoryCardContainer;
