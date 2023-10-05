package com.ssafy.newkids.domain.member.repository;

import com.ssafy.newkids.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 회원 Data JPA 저장소
 *
 * @author 임우택
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    /**
     * 이메일로 계정 엔티티 조회
     * @param email 조회할 이메일
     * @return 회원 엔티티
     */
    Optional<Member> findByEmail(String email);
}
