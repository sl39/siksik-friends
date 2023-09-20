package com.ssf.domain.Member.Friends.service;

import com.ssf.domain.Member.Friends.entity.Friends;
import com.ssf.domain.Member.Friends.repository.FriendsRepository;
import com.ssf.domain.Member.Member.entity.Member;
import com.ssf.domain.Member.Member.entity.dto.MemberFriendDTO;
import com.ssf.domain.Member.Member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FriendsService {
    private final FriendsRepository friendsRepository;
    private final MemberRepository memberRepository;

    public FriendsService(FriendsRepository friendsRepository, MemberRepository memberRepository) {
        this.friendsRepository = friendsRepository;
        this.memberRepository = memberRepository;
    }

    private boolean findById(Long fromUserId,Long toUserId){
        Optional<Friends> friends = friendsRepository.findByFromUserIdAndToUserId(fromUserId, toUserId);
        if (friends.isEmpty()){
            return true;
        }
        return false;
    }

    public Friends save(Long fromUserId, Long toUserId){
        if(findById(fromUserId,toUserId)){
            if(findById(toUserId,fromUserId)){
                return Friends.builder()
                        .fromUserId(fromUserId)
                        .toUserId(toUserId)
                        .activated(false)
                        .build();
            }
            Optional<Friends> friends = friendsRepository.findByFromUserIdAndToUserId(toUserId,fromUserId);
            Friends setFriends = Friends.builder()
                    .id(friends.get().getId())
                    .fromUserId(toUserId)
                    .toUserId(fromUserId)
                    .activated(true)
                    .build();
            return setFriends;
        }
        else{
            if(findById(toUserId,fromUserId)){
                throw new IllegalArgumentException("이미 친구요청을 하셨습니다");
            }
            throw new IllegalArgumentException("이미 친구 입니다");
                        
        }
    }

    public List<MemberFriendDTO> getFriends(Long userId){
        List<Friends> friendsList = friendsRepository.findByActivatedAndFromUserIdOrActivatedAndToUserId(true,userId,true, userId);
        Set<Long> friendIds = new HashSet<>();
        for (Friends friends1 : friendsList){
            friendIds.add(friends1.getFromUserId());
            friendIds.add(friends1.getToUserId());
        }
        friendIds.remove(userId);
        List<Member> members = memberRepository.findByIdIn(friendIds);

        List<MemberFriendDTO> friends = new ArrayList<>();
        for(Member member : members){
            MemberFriendDTO memberFriendDTO = new MemberFriendDTO(member);
            friends.add(memberFriendDTO);
        }
        return friends;
    }

    public Optional<Friends> delete(Long fromUserId, Long toUserId){
        memberRepository.findById(fromUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
        memberRepository.findById(toUserId).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다"));
        Optional<Friends> friends1 = friendsRepository.findByFromUserIdAndToUserIdAndActivated(fromUserId, toUserId, true);
        Optional<Friends> friends2 = friendsRepository.findByFromUserIdAndToUserIdAndActivated(toUserId,fromUserId, true);

        if (friends1.isEmpty()){
            if(friends2.isEmpty()){
                throw new IllegalArgumentException("친구가 아닙니다");
            }
            return friends2;
        }
        return friends1;
    }

}
