DELIMITER $$
CREATE FUNCTION `fun_get_user_subscribe_feature_val` (
    p_subscription_id             BIGINT UNSIGNED,
    p_user_id                     BIGINT UNSIGNED,
    p_subscription_feature_id     VARCHAR(50),
    p_aggr_opt                    ENUM('MAX', 'SUM')
)
RETURNS DOUBLE
BEGIN
  RETURN ( IFNULL (
    (SELECT 
     IF(p_aggr_opt = 'SUM' , SUM(feature_value), MAX(feature_value))
    FROM 
      subscriptions s
      INNER JOIN subscription_packages_features spf ON  
        spf.subscription_package_id = s.subscription_package_id AND 
        spf.subscription_feature_id = p_subscription_feature_id
    WHERE 
      (
        (p_subscription_id IS NULL AND s.user_id = p_user_id) OR
        id_subscription = p_subscription_id
      ) AND 
      fun_is_user_subscription_valid(id_subscription)
    GROUP BY 
      subscription_feature_id
    ), 0 )
  ); 


END$$