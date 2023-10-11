package com.OAuth.spring.member.Repository;

import com.OAuth.spring.member.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


// CRUD 함수를 JpaRepository가 들고 있음
// @Repository라는 어노테이션이 없어도 IOC가 됨. 이유는 JpaRepsoitory를 상속했기 때문에
public interface UserRepository extends JpaRepository<User, Long> {
    // findBy 규칙 -> Username 문법
    // select * from user where username = ?
    public User findByUsername(String username);


}
