import CrownIcon from "@/assets/icons/crown.svg";
import { Avatar } from "@/components/common/Avatar";
import { Chip } from "@/components/common/Chip";
import type { RoomMember } from "@/types/room";

export function MemberList({ members }: { members: RoomMember[] }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-body-lg font-semibold">참여자</h2>
        <span className="text-body-lg font-semibold text-foreground-secondary tabular-nums">
          {members.length}
        </span>
      </div>

      <ul className="border-t border-border">
        {members.map((member, index) => (
          <li
            key={member.id}
            className={[
              "flex items-center gap-3 py-3",
              index > 0 && "border-t border-border",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Avatar name={member.name} tint={index} />
            <span className="flex-1 text-body">
              {member.name}
              {member.isMe && (
                <span className="ml-1.5 text-caption text-foreground-secondary">
                  나
                </span>
              )}
            </span>
            {member.isHost && (
              <Chip tone="host">
                <CrownIcon className="size-3" aria-hidden="true" />
                방장
              </Chip>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
