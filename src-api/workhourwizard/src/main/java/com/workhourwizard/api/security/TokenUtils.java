package com.workhourwizard.api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.*;

public class TokenUtils {

  private static final String ACCESS_TOKEN_SECRERT = "=1aBcDeFgHiJkL2mNoPqRsTuV3wXyZ4?";
  private static final Long ACCESS_TOKEN_VALIDITY_SECONDS = 2_629_746L;

  public static String createToken(String dni, String email) {
    long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1_000;
    Date expirationDate = new Date(System.currentTimeMillis() + expirationTime);

    Map<String, Object> extra = new HashMap<>();
    extra.put("dni", dni);

    return Jwts.builder()
        .setSubject(email)
        .setExpiration(expirationDate)
        .addClaims(extra)
        .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRERT.getBytes()))
        .compact();
  }

  public static UsernamePasswordAuthenticationToken getAuthentication(String token) {
    try {
      Claims claims =
          Jwts.parserBuilder()
              .setSigningKey(ACCESS_TOKEN_SECRERT.getBytes())
              .build()
              .parseClaimsJws(token)
              .getBody();

      String email = claims.getSubject();

      return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

    } catch (JwtException e) {
      return null;
    }
  }
}
